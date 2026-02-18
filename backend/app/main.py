from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, users, complaints
from app.database import engine, Base
from app.models import user, otp  # noqa
from app.config import settings

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
    "http://localhost:8080",
]
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(complaints.router)

@app.get("/")
def root():
    return {"message": "Welcome to TMS API", "status": "running"}