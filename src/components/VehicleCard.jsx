function VehicleCard({ vehicle, type, status, location }) {
  return (
    <div className="vehicle-card">
      <div className="vehicle-header">
        <h3>{vehicle}</h3>

        <span className={`vehicle-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <p>🚑 {type}</p>
      <p>📍 {location}</p>
    </div>
  );
}

export default VehicleCard;