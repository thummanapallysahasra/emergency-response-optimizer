from app.models import Incident, Station, Vehicle


stations = [
    Station(
        id="S1",
        name="Central Station",
        x=10,
        y=32,
    ),
    Station(
        id="S2",
        name="North Station",
        x=40,
        y=10,
    ),
    Station(
        id="S3",
        name="South Station",
        x=50,
        y=22,
    ),
]


vehicles = [
    Vehicle(
        id="AMB-101",
        type="ambulance",
        station_id="S1",
        x=10,
        y=32,
        fuel_liters=50,
        speed_kmh=65,
        fuel_efficiency_kpl=6.5,
        zone="Zone_A",
        available=True,
    ),
    Vehicle(
        id="AMB-102",
        type="ambulance",
        station_id="S1",
        x=15.2,
        y=45,
        fuel_liters=50,
        speed_kmh=60,
        fuel_efficiency_kpl=6.0,
        zone="Zone_A",
        available=True,
    ),
    Vehicle(
        id="FIRE-201",
        type="fire_truck",
        station_id="S2",
        x=40,
        y=10,
        fuel_liters=100,
        speed_kmh=48,
        fuel_efficiency_kpl=2.5,
        zone="Zone_B",
        available=True,
    ),
    Vehicle(
        id="AMB-103",
        type="ambulance",
        station_id="S3",
        x=50.5,
        y=22,
        fuel_liters=50,
        speed_kmh=58,
        fuel_efficiency_kpl=6.2,
        zone="Zone_C",
        available=True,
    ),
]


incidents = [
    Incident(
        id="INC-001",
        type="Cardiac Arrest",
        base_priority=3,
        reported_time_ago_min=12,
        x=12.5,
        y=34.1,
    ),
    Incident(
        id="INC-002",
        type="Structure Fire",
        base_priority=2,
        reported_time_ago_min=4.5,
        x=45.2,
        y=12.8,
    ),
    Incident(
        id="INC-003",
        type="Minor Car Crash",
        base_priority=1,
        reported_time_ago_min=18,
        x=22.1,
        y=19.5,
    ),
]


zone_coverage = {
    "Zone_A": {
        "total_assets": 5,
        "active_deployments": 2,
    },
    "Zone_B": {
        "total_assets": 3,
        "active_deployments": 1,
    },
    "Zone_C": {
        "total_assets": 4,
        "active_deployments": 3,
    },
}