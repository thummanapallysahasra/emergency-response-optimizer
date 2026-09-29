from fastapi import APIRouter, HTTPException

from app.data import incidents, vehicles
from app.services.dispatch_service import recommend_vehicle


router = APIRouter(
    prefix="/dispatch",
    tags=["Dispatch"],
)


@router.post("")
def dispatch_vehicle(incident_id: str):
    incident = next(
        (
            item
            for item in incidents
            if item.id == incident_id
        ),
        None,
    )

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    result = recommend_vehicle(
        incident,
        vehicles,
    )

    if result is None:
        raise HTTPException(
            status_code=409,
            detail="No suitable vehicle available",
        )

    return result