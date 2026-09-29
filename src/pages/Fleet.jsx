import { useState } from "react";
import { vehicles } from "../data/dummyData";

function Fleet() {
  const [filter, setFilter] = useState("All");
  const [fleetVehicles, setFleetVehicles] = useState(vehicles);

  const dispatchVehicle = (id) => {
    setFleetVehicles((currentVehicles) =>
      currentVehicles.map((vehicle) =>
        vehicle.id === id
          ? { ...vehicle, status: "Dispatched" }
          : vehicle
      )
    );
  };

  const filteredVehicles =
    filter === "All"
      ? fleetVehicles
      : fleetVehicles.filter(
          (vehicle) => vehicle.status === filter
        );

  return (
    <main className="dashboard">
      <h2>Emergency Fleet</h2>

      <p>Monitor the status and location of emergency vehicles.</p>

      <div className="incident-filters">
        {["All", "Available", "Dispatched", "Maintenance"].map(
          (status) => (
            <button
              key={status}
              className={filter === status ? "filter-active" : ""}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          )
        )}
      </div>

      <div className="fleet-grid">
        {filteredVehicles.map((vehicle) => (
          <div className="fleet-card" key={vehicle.id}>
            <div className="fleet-header">
              <div>
                <span className="vehicle-id">{vehicle.id}</span>
                <h3>{vehicle.type}</h3>
              </div>

              <span
                className={`vehicle-status ${vehicle.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {vehicle.status}
              </span>
            </div>

            <div className="fleet-info">
              <p>📍 {vehicle.location}</p>
            </div>

            {vehicle.status === "Available" && (
              <button
                className="dispatch-btn"
                onClick={() => dispatchVehicle(vehicle.id)}
              >
                Dispatch
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Fleet;