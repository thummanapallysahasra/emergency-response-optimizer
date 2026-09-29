from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import dispatch, incidents, stations, vehicles


app = FastAPI(
    title="Emergency Response Optimizer API",
    description="Backend API for intelligent emergency fleet dispatch.",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Emergency Response Optimizer API is running"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


app.include_router(vehicles.router)
app.include_router(stations.router)
app.include_router(incidents.router)
app.include_router(dispatch.router)