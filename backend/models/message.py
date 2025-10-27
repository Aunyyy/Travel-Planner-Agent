from pydantic import BaseModel
from typing import Literal, List

class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class MessagesPayload(BaseModel):
    messages: List[Message]