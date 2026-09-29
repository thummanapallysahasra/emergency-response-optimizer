from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_get_incidents():
    response = client.get("/incidents")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_existing_incident():
    response = client.get("/incidents/INC-001")
    assert response.status_code == 200
    assert response.json()["id"] == "INC-001"


def test_get_missing_incident():
    response = client.get("/incidents/DOES-NOT-EXIST")
    assert response.status_code == 404