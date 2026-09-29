import StatCard from "../components/StatCard";
import MapView from "../components/MapView";
import IncidentCard from "../components/IncidentCard";
import VehicleCard from "../components/VehicleCard";
import DispatchPanel from "../components/DispatchPanel";

import { incidents, vehicles } from "../data/dummyData";

function Dashboard() {
  const activeIncidents = incidents.filter(
    (incident) => incident.status === "Active"
  );

  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Available"
  );

  return (
    <main className="dashboard">
      <h2>Emergency Response Dashboard</h2>

      <p>Monitor incidents, vehicles and dispatch operations.</p>

      <div className="stats-grid">
        <StatCard
          title="Active Incidents"
          value={activeIncidents.length}
          icon="🚨"
        />

        <StatCard
          title="Available Vehicles"
          value={availableVehicles.length}
          icon="🚑"
        />

        <StatCard
          title="Average Response Time"
          value="7 min"
          icon="⏱️"
        />

        <StatCard
          title="Vehicles Dispatched"
          value="24"
          icon="🚗"
        />
      </div>

      <IncidentCard
        type={incidents[0].type}
        location={incidents[0].location}
        priority={incidents[0].priority}
        time={incidents[0].time}
      />

      <VehicleCard
        vehicle={vehicles[0].id}
        type={vehicles[0].type}
        status={vehicles[0].status}
        location={vehicles[0].location}
      />

      <DispatchPanel />

      <MapView />
    </main>
  );
}

export default Dashboard;