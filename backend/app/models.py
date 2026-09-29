from typing import Literal

from pydantic import BaseModel, Field


class Vehicle(BaseModel):
    id: str
    type: Literal["ambulance", "fire_truck", "police"]
    station_id: str
    x: int
    y: int
    fuel: float = Field(ge=0, le=100)
    available: bool = True
    fuel_rate: float = Field(default=1.0, gt=0)


class Station(BaseModel):
    id: str
    name: str
    x: int
    y: int


class Incident(BaseModel):
    id: str
    type: str
    severity: Literal["low", "medium", "high", "critical"]
    x: int
    y: int