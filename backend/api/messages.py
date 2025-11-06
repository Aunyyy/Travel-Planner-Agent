import os
from fastapi import APIRouter
from models.message import Message
from agents.orchestrator_graph import compiled_graph
from fastapi.responses import JSONResponse
from models.agent import OrchestratorState
from api_cllients.amadeus_client import fetch_flights_in_week
import requests
from dotenv import load_dotenv

# Load .env file
load_dotenv()

AMADEUS_API_KEY = os.getenv("AMADEUS_API_KEY")
AMADEUS_API_SECRET = os.getenv("AMADEUS_API_SECRET")

router = APIRouter()


@router.post("/messages/send")
async def send_prompt(payload: Message):
    user_message = payload.content
    state = OrchestratorState(message=user_message)
    try:
        result = await compiled_graph.ainvoke(state)
        print("HERE made it back", result)
        response = {
            "role": "assistant",
            "next_agent": result["next_agent"],
            "destination": result["destination"]
        }

        # Add agent-specific fields
        if result["next_agent"] == "destination_agent":
            response.update({
                "images": result["images"],
                "description": result["description"]
            })
        elif result["next_agent"] == "flight_agent":
            response.update({
                "origin": result["origin"],
                "flights": result["flights"]
        })
            
        return JSONResponse(
            content=response
        )
    except Exception as e:
      return JSONResponse(status_code=500, content={"Error in messages": str(e)})

# Test
@router.get("/flights")
async def get_flights(origin, destination, start_date):
   flights_this_week = await fetch_flights_in_week(origin, destination, start_date)

   return JSONResponse (
      content={"flights_by_day": flights_this_week}
    )

@router.get("/token")
def get_token():
    url = "https://test.api.amadeus.com/v1/security/oauth2/token"
    payload = {
        "grant_type": "client_credentials",
        "client_id": AMADEUS_API_KEY,
        "client_secret": AMADEUS_API_SECRET 
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    response = requests.post(url, data=payload, headers=headers)
    return response.json()