import os
from amadeus import Client, ResponseError
from dotenv import load_dotenv
from datetime import datetime, timedelta
import asyncio

load_dotenv()

AMADEUS_API_KEY = os.getenv("AMADEUS_API_KEY")
AMADEUS_API_SECRET = os.getenv("AMADEUS_API_SECRET")
# AMADEUS_ACCESS_TOKEN = os.getenv("AMADEUS_ACCESS_TOKEN")

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
            ).data

      try:
            data = await loop.run_in_executor(None, _fetch)
            flights = []
            for f in data:
               seg = f["itineraries"][0]["segments"][0]
               flights.append({
                  "airline": f["validatingAirlineCodes"][0],
                  "departure": seg["departure"]["iataCode"],
                  "arrival": seg["arrival"]["iataCode"],
                  "departure_time": seg["departure"]["at"],
                  "arrival_time": seg["arrival"]["at"],
                  "price": f["price"]["total"],
                  "currency": f["price"]["currency"]
               })
            return {"date": date.strftime("%Y-%m-%d"), "flights": flights}
      except ResponseError as e:
            return {"date": date.strftime("%Y-%m-%d"), "error": str(e)}

   start_date_obj = datetime.strptime(start_date, "%Y-%m-%d")
   # Gather 7 days of data concurrently
   tasks = [fetch_for_day(start_date_obj + timedelta(days=i)) for i in range(7)]
   return await asyncio.gather(*tasks)
