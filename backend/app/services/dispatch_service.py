from app.models import Incident, Vehicle


def calculate_distance(
    vehicle: Vehicle,
    incident: Incident,
) -> int:
    return abs(vehicle.x - incident.x) + abs(
        vehicle.y - incident.y
    )


def recommend_vehicle(
    incident: Incident,
    vehicles: list[Vehicle],
):
    candidates = []

    for vehicle in vehicles:

        if not vehicle.available:
            continue

        distance = calculate_distance(
            vehicle,
            incident,
        )

        fuel_needed = distance * vehicle.fuel_rate

        if fuel_needed > vehicle.fuel:
            continue

        eta_minutes = distance * 2

        candidates.append(
            {
                "vehicle_id": vehicle.id,
                "eta_minutes": eta_minutes,
                "fuel_cost": fuel_needed,
                "distance": distance,
            }
        )

    if not candidates:
        return None

    candidates.sort(
        key=lambda candidate: (
            candidate["eta_minutes"],
            candidate["fuel_cost"],
        )
    )

    return candidates[0]