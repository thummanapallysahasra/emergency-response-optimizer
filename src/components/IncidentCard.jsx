function IncidentCard({ type, location, priority, time }) {
  return (
    <div className="incident-card">
      <div className="incident-header">
        <h3>{type}</h3>
        <span className={`priority ${priority.toLowerCase()}`}>
          {priority}
        </span>
      </div>

      <p>📍 {location}</p>
      <p>🕒 Reported {time}</p>

      <button className="dispatch-btn">
        Dispatch Vehicle
      </button>
    </div>
  );
}

export default IncidentCard;