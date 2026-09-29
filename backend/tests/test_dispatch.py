from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_dispatch_existing_incident():
    response = client.post(
        "/dispatch",
        params={"incident_id": "INC-001"},
    )

    assert response.status_code == 200

    data = response.json()

    assert "vehicle_id" in data
    assert "eta_minutes" in data
    assert "fuel_cost" in data


def test_dispatch_missing_incident():
    response = client.post(
        "/dispatch",
        params={"incident_id": "DOES-NOT-EXIST"},
    )

    assert response.status_code == 404