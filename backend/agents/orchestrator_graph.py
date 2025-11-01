import os
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from models.agent import OrchestratorState
import json
from dotenv import load_dotenv


# Agents
from .destination_agent import run_destination_agent
from .flight_agent import run_flights_agent

load_dotenv()

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

LLM = ChatOpenAI(model="gpt-5-nano", temperature=0, openai_api_key=OPENAI_API_KEY)

async def orchestrator_node(state:  OrchestratorState):
   user_message = state.message

   prompt = f"""
    You are a travel AI orchestrator. 

    Analyze this user query and decide which agent should handle it:
    - destination_agent: explores a city/country with images + description
    - flight_agent: finds flights between origin and destination
    - itinerary_agent: creates multi-day itineraries

    Extract relevant entities if mentioned: destination, origin, start_date.

    Respond ONLY in JSON like this:
    {{
        "next_agent": "destination_agent|flight_agent|itinerary_agent",
        "destination": "<city or country if mentioned>",
        "destination_IATA_code": "<destination city airports IATA code if next_agent == flight_agent>",
        "origin": "<city/airport if mentioned>",
        "origin_IATA_code": "<origin city airports IATA code if next_agent == flight_agent>",
        "start_date": "<date if mentioned> in %Y-%m-%d format"
    }}

    User query: "{user_message}"
    """
   
   response = (await LLM.ainvoke(prompt)).content
   
   try:
      parsed = json.loads(response)
   except json.JSONDecodeError:
      parsed = {"retry": "Didn't get that, try asking about travel destinations or flights."}
   
   return parsed

# Build Graph

graph = StateGraph(state_schema=OrchestratorState)

# Nodes
graph.add_node("orchestrator", orchestrator_node)
graph.add_node("destination_agent", run_destination_agent)
graph.add_node("flight_agent", run_flights_agent)

# Entry point
graph.set_entry_point("orchestrator")

# Conditional routing based on Orchestrator
graph.add_conditional_edges(
   "orchestrator",
   lambda state: state.next_agent,
   {
      "destination_agent": "destination_agent",
      "flight_agent": "flight_agent",
   }
)

graph.add_edge("destination_agent", END)
graph.add_edge("flight_agent", END)

compiled_graph = graph.compile()

