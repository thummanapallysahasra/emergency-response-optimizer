const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function dispatchIncident(incidentId) {
  const response = await fetch(
    `${API_URL}/dispatch?incident_id=${encodeURIComponent(incidentId)}`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Dispatch failed");
  }

  return data;
}