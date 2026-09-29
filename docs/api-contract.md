# API Contract

## Incident

```json
{
  "id": "INC-001",
  "type": "medical",
  "severity": "high",
  "latitude": 17.3850,
  "longitude": 78.4867
}
```

## Vehicle

```json
{
  "id": "AMB-01",
  "type": "ambulance",
  "available": true,
  "fuel": 80,
  "latitude": 17.3800,
  "longitude": 78.4800
}
```

## Dispatch Response

```json
{
  "vehicle_id": "AMB-01",
  "eta_minutes": 4,
  "total_score": 0.89,
  "reason": "Fast response while maintaining coverage"
}
```
