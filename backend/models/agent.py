from pydantic import BaseModel
from typing import Optional, List

class FlightSegment(BaseModel):
    departure: str
    departure_terminal: str
    arrival: str
    arrival_terminal: str
    departure_time: str
    arrival_time: str
    airline: str
    aircraft: str
    duration: str

class Flight(BaseModel):
    price: str
    currency: str
    total_duration: str
    itinerary: List[FlightSegment]


class FlightsByDay(BaseModel):
    date: str
    flights: Optional[List[Flight]] = None
    error: Optional[str] = None

class OrchestratorState(BaseModel):
    message: str
    next_agent: Optional[str] = None
    destination: Optional[str] = None
    destination_IATA_code: Optional[str] = None
    origin: Optional[str] = None
    origin_IATA_code: Optional[str] = None
    start_date: Optional[str] = None
    description: Optional[str] = None
    images: Optional[List[str]] = None
    flights: Optional[List[FlightsByDay]] = None
    error: Optional[str] = None