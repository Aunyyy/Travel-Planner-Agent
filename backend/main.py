import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from api import messages  # import router

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
   return {"message": "Hello World"}

# Include routers
app.include_router(messages.router, prefix="/api/conversations", tags=["Messages"])

if __name__ == "__main__":
   uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
