from fastapi import APIRouter, status
from models.message import Message
from agents.orchestrator_graph import compiled_graph
from fastapi.responses import JSONResponse
from models.agent import OrchestratorState



router = APIRouter()


@router.post("/messages/send")
async def send_prompt(payload: Message):
    user_message = payload.content
    state = OrchestratorState(message=user_message)
    try:
        result = await compiled_graph.ainvoke(state)
        return JSONResponse(
            content={"role": "assistant",
                     "destination": result["destination"],
                     "images": result["images"],
                     "description": result["description"]
                     }
        )
    except Exception as e:
      return JSONResponse(status_code=500, content={"error": str(e)})
