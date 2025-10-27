import os
import requests
from dotenv import load_dotenv

load_dotenv()

PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")
pexel_api_url = "https://api.pexels.com/v1"

if not PEXELS_API_KEY:
    raise ValueError("PEXELS_API_KEY is missing in .env file!")

async def search_photos(query: str, per_page: int = 10):
    search_url = pexel_api_url + "/search"
    headers = {"Authorization" : PEXELS_API_KEY}
    params = {"query": query, "per_page" : per_page, "orientation": "landscape"}

    res = requests.get(search_url, headers=headers, params=params)
    res.raise_for_status()

    data = res.json()
    
    return [photo["src"]["original"] for photo in data.get("photos", [])]
    