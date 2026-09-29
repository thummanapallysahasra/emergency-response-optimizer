from typing import Literal

from pydantic import BaseModel, Field


class Vehicle(BaseModel):
    id: str
    type: Literal["ambulance", "fire_truck", "police"]
    station_id: str
    x: float
    y: float

    fuel_liters: float = Field(ge=0)
    speed_kmh: float = Field(gt=0)
    fuel_efficiency_kpl: float = Field(gt=0)

    zone: str
    available: bool = True


class Station(BaseModel):
    id: str
    name: str
    x: float
    y: float


class Incident(BaseModel):
    id: str
    type: str

    base_priority: float = Field(gt=0)
    reported_time_ago_min: float = Field(ge=0)

    x: float
    y: float