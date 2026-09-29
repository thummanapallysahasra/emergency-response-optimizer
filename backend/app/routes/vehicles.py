from fastapi import APIRouter

from app.data import vehicles


router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicles"],
)


@router.get("")
def get_vehicles():
    return vehicles