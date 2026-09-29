import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function MapView() {
  const center = [17.385, 78.4867];

  const incidents = [
    {
      id: 1,
      type: "Traffic Accident",
      location: "LB Nagar",
      position: [17.3457, 78.5522],
      priority: "High",
    },
    {
      id: 2,
      type: "Medical Emergency",
      location: "Dilsukhnagar",
      position: [17.3688, 78.5247],
      priority: "Medium",
    },
    {
      id: 3,
      type: "Fire Emergency",
      location: "Kothapet",
      position: [17.3667, 78.5583],
      priority: "High",
    },
  ];

  const vehicles = [
    {
      id: 1,
      vehicle: "AMB-101",
      type: "Ambulance",
      position: [17.3615, 78.535],
      status: "Available",
    },
    {
      id: 2,
      vehicle: "FIRE-204",
      type: "Fire Truck",
      position: [17.375, 78.51],
      status: "Available",
    },
  ];

  return (
    <section className="map-section">
      <div className="map-title">
        <div>
          <h2>Live Emergency Map</h2>
          <p>Monitor incidents and emergency vehicles</p>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* INCIDENT MARKERS */}

        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={incident.position}
          >
            <Popup>
              <strong>🚨 {incident.type}</strong>
              <br />
              📍 {incident.location}
              <br />
              ⚠️ Priority: {incident.priority}
            </Popup>
          </Marker>
        ))}

        {/* VEHICLE MARKERS */}

        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={vehicle.position}
          >
            <Popup>
              <strong>🚑 {vehicle.vehicle}</strong>
              <br />
              Type: {vehicle.type}
              <br />
              Status: {vehicle.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="map-legend">
        <div>
          <span className="legend-dot incident-dot"></span>
          Emergency Incident
        </div>

        <div>
          <span className="legend-dot vehicle-dot"></span>
          Available Vehicle
        </div>
      </div>
    </section>
  );
}

export default MapView;