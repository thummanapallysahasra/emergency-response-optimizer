import { incidents, vehicles } from "../data/dummyData";

function Analytics() {
  const activeIncidents = incidents.filter(
    (incident) => incident.status === "Active"
  ).length;

  const resolvedIncidents = incidents.filter(
    (incident) => incident.status === "Resolved"
  ).length;

  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Available"
  ).length;

  const fleetUtilization =
    vehicles.length > 0
      ? Math.round(
          ((vehicles.length - availableVehicles) / vehicles.length) * 100
        )
      : 0;

  return (
    <main className="dashboard">
      <h2>Response Analytics</h2>

      <p>Performance overview of emergency response operations.</p>

      <div className="analytics-grid">
        <div className="analytics-card">
          <span>Average Response Time</span>
          <strong>7 min</strong>
          <small>Current average</small>
        </div>

        <div className="analytics-card">
          <span>Incidents Resolved</span>
          <strong>{resolvedIncidents}</strong>
          <small>Resolved incidents</small>
        </div>

        <div className="analytics-card">
          <span>Fleet Utilization</span>
          <strong>{fleetUtilization}%</strong>
          <small>Vehicles currently utilized</small>
        </div>

        <div className="analytics-card">
          <span>Active Incidents</span>
          <strong>{activeIncidents}</strong>
          <small>Requiring attention</small>
        </div>
      </div>

      <div className="performance-card">
        <h3>Response Performance</h3>

        <div className="progress-item">
          <div>
            <span>Ambulance Response</span>
            <strong>82%</strong>
          </div>

          <div className="progress-bar">
            <div style={{ width: "82%" }}></div>
          </div>
        </div>

        <div className="progress-item">
          <div>
            <span>Fire Response</span>
            <strong>74%</strong>
          </div>

          <div className="progress-bar">
            <div style={{ width: "74%" }}></div>
          </div>
        </div>

        <div className="progress-item">
          <div>
            <span>Rescue Response</span>
            <strong>68%</strong>
          </div>

          <div className="progress-bar">
            <div style={{ width: "68%" }}></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Analytics;