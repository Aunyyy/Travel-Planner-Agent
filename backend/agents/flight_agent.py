from models.agent import OrchestratorState
from api_cllients.amadeus_client import fetch_flights_in_week
from datetime import datetime

async def run_flights_agent(state: OrchestratorState):
    """
    Fetches available flights for an entire week between origin and destination.
    """
    try:
         origin_IATA_code = state.origin_IATA_code or "JFK"
         destination_IATA_code = state.destination_IATA_code or "ORD"
         start_date =  state.start_date if state.start_date else datetime.today().strftime("%Y-%m-%d")

         flights_this_week = await fetch_flights_in_week(origin_IATA_code, destination_IATA_code, start_date)

         return {
            "origin_IATA_code": origin_IATA_code,
            "destination_IATA_code": destination_IATA_code,
            "start_date": start_date,
            "flights": flights_this_week,
         }

    except Exception as e:
        return {"error": "Error in flights agent: " + str(e)}
