import { useState } from "react";
import { incidents, vehicles } from "../data/dummyData";

function DispatchPanel() {
  const [dispatched, setDispatched] = useState(false);

  const activeIncident = incidents.find(
    (incident) => incident.status === "Active"
  );

  const recommendedVehicle = vehicles.find(
    (vehicle) =>
      vehicle.status === "Available" &&
      vehicle.type === "Ambulance"
  );

  if (!activeIncident || !recommendedVehicle) {
    return (
      <section className="dispatch-panel">
        <h2>No dispatch available</h2>
        <p>
          There is currently no active incident or available ambulance.
        </p>
      </section>
    );
  }

  return (
    <section className="dispatch-panel">
      <div className="dispatch-heading">
        <div>
          <h2>AI Dispatch Recommendation</h2>
          <p>
            Optimal vehicle assignment based on emergency priority
            and response time.
          </p>
        </div>

        <span className="ai-badge">AI OPTIMIZED</span>
      </div>

      <div className="dispatch-content">
        <div className="dispatch-incident">
          <span>ACTIVE INCIDENT</span>

          <h3>{activeIncident.type}</h3>

          <p>📍 {activeIncident.location}</p>

          <strong>
            {activeIncident.priority} Priority
          </strong>
        </div>

        <div className="dispatch-arrow">→</div>

        <div className="recommended-vehicle">
          <span>RECOMMENDED VEHICLE</span>

          <h3>{recommendedVehicle.id}</h3>

          <p>🚑 {recommendedVehicle.type}</p>

          <p>📍 {recommendedVehicle.location}</p>

          <div className="recommendation-score">
            <span>Demo Optimization Score</span>
            <strong>94%</strong>
          </div>
        </div>
      </div>

      <div className="dispatch-reason">
        <strong>Why this vehicle?</strong>

        <p>
          {recommendedVehicle.id} is available and matches the
          requirements of this emergency.
        </p>
      </div>

      {!dispatched ? (
        <button
          className="confirm-dispatch"
          onClick={() => setDispatched(true)}
        >
          Confirm Dispatch
        </button>
      ) : (
        <div className="dispatch-success">
          ✅ Dispatch Confirmed — {recommendedVehicle.id} assigned to{" "}
          {activeIncident.id}
        </div>
      )}
    </section>
  );
}

export default DispatchPanel;