import { useState } from "react";
import { incidents } from "../data/dummyData";
import { dispatchIncident } from "../services/api";

function DispatchPanel() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activeIncident = incidents.find(
    (incident) => incident.status === "Active"
  );

  if (!activeIncident) {
    return (
      <section className="dispatch-panel">
        <h2>No dispatch available</h2>
        <p>No active incident.</p>
      </section>
    );
  }

  const handleDispatch = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await dispatchIncident(activeIncident.id);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          <strong>{activeIncident.priority} Priority</strong>
        </div>

        <div className="dispatch-arrow">→</div>

        <div className="recommended-vehicle">
          <span>RECOMMENDED VEHICLE</span>
          <h3>{result?.vehicle_id || "Awaiting AI..."}</h3>

          {result && (
            <>
              <p>⏱ ETA: {result.eta_minutes} min</p>
              <p>📏 Distance: {result.distance_km} km</p>
              <div className="recommendation-score">
                <span>Heuristic Score</span>
                <strong>{result.heuristic_score}</strong>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="dispatch-reason">
          <strong>Error</strong>
          <p>{error}</p>
        </div>
      )}

      {!result ? (
        <button
          className="confirm-dispatch"
          onClick={handleDispatch}
          disabled={loading}
        >
          {loading ? "Calculating..." : "Get AI Dispatch Recommendation"}
        </button>
      ) : (
        <div className="dispatch-success">
          ✅ Dispatch Confirmed — {result.vehicle_id} assigned to{" "}
          {result.incident_id}
        </div>
      )}
    </section>
  );
}

export default DispatchPanel;