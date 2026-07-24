from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import APP_NAME, APP_VERSION, API_PREFIX
from app.routes.health import router as health_router

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    description="Backend API for Real-Time Industrial Defect Detection System"
)

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    health_router,
    prefix=API_PREFIX,
    tags=["Health"],
)