import os
from amadeus import Client, ResponseError
from dotenv import load_dotenv
from datetime import datetime, timedelta
import asyncio

load_dotenv()

AMADEUS_API_KEY = os.getenv("AMADEUS_API_KEY")
AMADEUS_API_SECRET = os.getenv("AMADEUS_API_SECRET")

amadeus = Client(
    client_id=AMADEUS_API_KEY,
    client_secret=AMADEUS_API_SECRET,
)

async def fetch_flights_in_week(origin: str, destination: str, start_date: str):
   loop = asyncio.get_event_loop()

   async def fetch_for_day(date: datetime):
      def _fetch():
            return amadeus.shopping.flight_offers_search.get(
               originLocationCode=origin,
               destinationLocationCode=destination,
               departureDate=date.strftime("%Y-%m-%d"),
               adults=1,
               max=3,
               currencyCode="USD",
            ).result

      try:
            result = await loop.run_in_executor(None, _fetch)
            data = result["data"]
            data_dict = result["dictionaries"]
            flights = []
            for f in data:
               flights.append({
                  "price": f["price"]["total"],
                  "currency": f["price"]["currency"],
                  "total_duration": f["itineraries"][0].get("duration"),
                  "itinerary": []
               })

               for flight in f["itineraries"][0]["segments"]:
                    aircraft_code = flight.get("aircraft")["code"]
                    airline_IATA = flight["carrierCode"]
                    flights[-1]["itinerary"].append(
                         {
                           "departure": flight["departure"]["iataCode"],
                           "departure_terminal": flight["departure"].get("terminal"),
                           "arrival": flight["arrival"]["iataCode"],
                           "arrival_terminal": flight["arrival"].get("terminal"),
                           "departure_time": flight["departure"]["at"],
                           "arrival_time": flight["arrival"]["at"],
                           "airline": data_dict["carriers"][airline_IATA],
                           "aircraft": data_dict.get("aircraft").get(aircraft_code),
                           "duration": flight["duration"],
                         }
                    )
                    
            return {"date": date.strftime("%Y-%m-%d"), "flights": flights}
      except ResponseError as e:
            return {"date": date.strftime("%Y-%m-%d"), "error": str(e)}

   start_date_obj = datetime.strptime(start_date, "%Y-%m-%d")
   # Gather 7 days of data concurrently
   tasks = [fetch_for_day(start_date_obj + timedelta(days=i)) for i in range(7)]
   return await asyncio.gather(*tasks)
