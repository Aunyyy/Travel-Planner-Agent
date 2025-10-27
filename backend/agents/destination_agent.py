import os
from langchain_openai import ChatOpenAI
from models.agent import (
    OrchestratorState,
)
from dotenv import load_dotenv
from api_cllients.pexels_client import search_photos

load_dotenv()

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

llm = ChatOpenAI(model="gpt-5-nano", temperature=0, openai_api_key=OPENAI_API_KEY)

async def run_destination_agent(state: OrchestratorState):
   try:
      destination = state.destination
      prompt = f"Write a short, exciting travel description for {destination}."
      description = (await llm.ainvoke(prompt)).content
      images = await search_images(destination)

      return {
         "destination": destination,
         "description": description,
         "images": images,
      }
   except Exception as e:
      return {
            "error": "Destination agent failed",
            "message": str(e),
      }

async def search_images(destination: str):
   try:
      location = destination
      images = await search_photos(location, per_page=10)
      return images
   except Exception as e:
      return ["Error in search_images function"]

