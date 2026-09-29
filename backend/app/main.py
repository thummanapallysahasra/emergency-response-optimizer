from fastapi import FastAPI

app = FastAPI(
    title="Emergency Response Optimizer API",
    description="Backend API for intelligent emergency fleet dispatch.",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "Emergency Response Optimizer API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }