from app.data import zone_coverage
from app.models import Incident, Vehicle


def calculate_incident_risk(
    base_priority: float,
    time_elapsed: float,
) -> float:
    """
    Calculate dynamic incident risk.

    Risk increases as the incident remains unresolved.
    """
    if base_priority < 0 or time_elapsed < 0:
        raise ValueError("Priority and elapsed time must be non-negative")

    return base_priority * (1 + time_elapsed / 10)


def calculate_eta(
    vehicle: Vehicle,
    incident: Incident,
) -> tuple[float, float]:
    """
    Calculate Manhattan distance and estimated travel time.

    Returns:
        (eta_minutes, distance_km)
    """
    distance_km = abs(vehicle.x - incident.x) + abs(vehicle.y - incident.y)

    if vehicle.speed_kmh <= 0:
        return float("inf"), distance_km

    travel_time_minutes = (distance_km / vehicle.speed_kmh) * 60

    # Dispatch preparation overhead from the original algorithm.
    dispatch_overhead = 1.5

    eta_minutes = travel_time_minutes + dispatch_overhead

    return eta_minutes, distance_km


def calculate_fuel_consumed(
    distance_km: float,
    fuel_efficiency_kpl: float,
) -> float:
    """
    Calculate fuel required for the trip.
    """
    if fuel_efficiency_kpl <= 0:
        raise ValueError("Fuel efficiency must be greater than zero")

    return distance_km / fuel_efficiency_kpl


def calculate_coverage_impact(
    zone: str,
) -> float:
    """
    Calculate the current deployment ratio of a zone.
    """
    coverage = zone_coverage.get(zone)

    if coverage is None:
        return 0.0

    total_assets = coverage["total_assets"]
    active_deployments = coverage["active_deployments"]

    if total_assets <= 0:
        return 0.0

    return active_deployments / total_assets


def is_vehicle_eligible(
    vehicle: Vehicle,
    incident: Incident,
) -> bool:
    """
    Check whether a vehicle type can handle the incident type.
    """
    if incident.type == "Cardiac Arrest":
        return vehicle.type == "ambulance"

    if incident.type == "Structure Fire":
        return vehicle.type == "fire_truck"

    # Minor Car Crash can be handled by an ambulance.
    if incident.type == "Minor Car Crash":
        return vehicle.type == "ambulance"

    return True


def calculate_heuristic_score(
    dynamic_risk: float,
    eta_minutes: float,
    fuel_liters: float,
    coverage_impact: float,
) -> float:
    """
    Multi-objective heuristic score.

    Higher score = better dispatch candidate.
    """
    return (
        (dynamic_risk * 40.0)
        - (eta_minutes * 3.0)
        - (fuel_liters * 1.5)
        - (coverage_impact * 20.0)
    )


def recommend_vehicle(
    incident: Incident,
    vehicles: list[Vehicle],
):
    """
    Find the best available vehicle for an incident.
    """

    current_risk = calculate_incident_risk(
        incident.base_priority,
        incident.reported_time_ago_min,
    )

    candidates = []

    for vehicle in vehicles:

        # Vehicle must be available.
        if not vehicle.available:
            continue

        # Vehicle must be suitable for the incident.
        if not is_vehicle_eligible(vehicle, incident):
            continue

        # Calculate ETA and distance.
        eta_minutes, distance_km = calculate_eta(
            vehicle,
            incident,
        )

        # Calculate fuel required.
        fuel_liters = calculate_fuel_consumed(
            distance_km,
            vehicle.fuel_efficiency_kpl,
        )

        # Vehicle must have enough fuel.
        if fuel_liters > vehicle.fuel_liters:
            continue

        # Calculate zone coverage impact.
        coverage_impact = calculate_coverage_impact(
            vehicle.zone,
        )

        # Calculate final heuristic score.
        heuristic_score = calculate_heuristic_score(
            current_risk,
            eta_minutes,
            fuel_liters,
            coverage_impact,
        )

        candidates.append(
            {
                "vehicle_id": vehicle.id,
                "incident_id": incident.id,
                "incident_type": incident.type,
                "dynamic_risk": round(current_risk, 2),
                "eta_minutes": round(eta_minutes, 2),
                "distance_km": round(distance_km, 2),
                "fuel_liters": round(fuel_liters, 2),
                "zone_coverage_risk": round(
                    coverage_impact,
                    2,
                ),
                "heuristic_score": round(
                    heuristic_score,
                    2,
                ),
            }
        )

    if not candidates:
        return None

    # Highest heuristic score is selected.
    candidates.sort(
        key=lambda candidate: candidate["heuristic_score"],
        reverse=True,
    )

    return candidates[0]