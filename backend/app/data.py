from app.models import Incident, Station, Vehicle


stations = [
    Station(
        id="S1",
        name="Central Station",
        x=1,
        y=1,
    ),
    Station(
        id="S2",
        name="North Station",
        x=4,
        y=4,
    ),
]


vehicles = [
    Vehicle(
        id="AMB-01",
        type="ambulance",
        station_id="S1",
        x=1,
        y=1,
        fuel=80,
        available=True,
        fuel_rate=1.0,
    ),
    Vehicle(
        id="AMB-02",
        type="ambulance",
        station_id="S2",
        x=4,
        y=4,
        fuel=90,
        available=True,
        fuel_rate=1.0,
    ),
    Vehicle(
        id="AMB-03",
        type="ambulance",
        station_id="S1",
        x=2,
        y=1,
        fuel=30,
        available=False,
        fuel_rate=1.0,
    ),
]


incidents = [
    Incident(
        id="INC-001",
        type="accident",
        severity="critical",
        x=4,
        y=3,
    ),
]