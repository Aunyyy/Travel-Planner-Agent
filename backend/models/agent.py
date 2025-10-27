from pydantic import BaseModel
from typing import Optional, List


class OrchestratorState(BaseModel):
    message: str
    next_agent: Optional[str] = None
    destination: Optional[str] = None
    origin: Optional[str] = None
    date: Optional[str] = None
    description: Optional[str] = None
    images: Optional[List[str]] = None
    error: Optional[str] = None