from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.chatbot_api import app as chatbot_app
from api.verification_api import app as verification_app

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Mount the Chatbot API under /chatbot
app.mount("/chatbot", chatbot_app)

# Mount the Verification API under /verification
app.mount("/verification", verification_app)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)