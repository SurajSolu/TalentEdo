import hashlib
import os
import secrets

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import Base, engine
from routers import courses, leads

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TalentEdo API")

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:4173",
]

# Add Netlify domain from env if set
NETLIFY_URL = os.getenv("NETLIFY_URL")
if NETLIFY_URL:
    ALLOWED_ORIGINS.append(NETLIFY_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(courses.router)
app.include_router(leads.router)

# --- Admin Auth ---
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "suraj")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "12345")

# Simple token store (in-memory; resets on server restart)
valid_tokens: set[str] = set()


class LoginRequest(BaseModel):
    username: str
    password: str


@app.post("/api/auth/login")
def login(req: LoginRequest):
    if req.username == ADMIN_USERNAME and req.password == ADMIN_PASSWORD:
        token = secrets.token_hex(32)
        valid_tokens.add(token)
        return {"token": token}
    raise HTTPException(status_code=401, detail="Invalid credentials")


@app.get("/api/auth/verify")
def verify_token(authorization: str = ""):
    """Quick check if a token is still valid."""
    token = authorization.replace("Bearer ", "")
    if token in valid_tokens:
        return {"valid": True}
    raise HTTPException(status_code=401, detail="Invalid token")


def get_current_admin(authorization: str) -> bool:
    """Utility used by routers to verify admin token."""
    token = authorization.replace("Bearer ", "")
    if token not in valid_tokens:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return True


@app.get("/")
def root():
    return {"message": "TalentEdo API is running"}
