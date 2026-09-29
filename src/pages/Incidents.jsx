import { useState } from "react";
import { incidents } from "../data/dummyData";

function Incidents() {
  const [filter, setFilter] = useState("All");

  const filteredIncidents =
    filter === "All"
      ? incidents
      : incidents.filter((incident) => incident.status === filter);

  return (
    <main className="dashboard">
      <h2>Emergency Incidents</h2>

      <p>Monitor and manage reported emergency incidents.</p>

      <div className="incident-filters">
        {["All", "Active", "Waiting"].map((status) => (
          <button
            key={status}
            className={filter === status ? "filter-active" : ""}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="incident-list">
        {filteredIncidents.map((incident) => (
          <div className="incident-row" key={incident.id}>
            <div>
              <span className="incident-id">{incident.id}</span>

              <h3>{incident.type}</h3>

              <p>📍 {incident.location}</p>
            </div>

            <div className="incident-details">
              <span
                className={`priority ${incident.priority.toLowerCase()}`}
              >
                {incident.priority}
              </span>

              <span
                className={`incident-status ${incident.status.toLowerCase()}`}
              >
                {incident.status}
              </span>

              <span className="incident-time">
                🕒 {incident.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Incidents;