from fastapi import APIRouter

from app.data import stations


router = APIRouter(
    prefix="/stations",
    tags=["Stations"],
)


@router.get("")
def get_stations():
    return stations