from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, users, complaints
from app.database import engine, Base
from app.models import user, otp  # noqa

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Smart Parking API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[" http://localhost:8080"],  # Replace with your frontend URL in production, e.g., ["http://localhost:3000"]
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
    return {"message": "Welcome to Smart Parking API"}