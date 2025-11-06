
// src/services/participantesService.js

const API_URL = "http://localhost:5151/api/listado";

export async function getParticipantes(search = "") {
  const url = search
    ? `${API_URL}/all?q=${encodeURIComponent(search)}`
    : `${API_URL}/all`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Error al obtener los participantes");
  }

  return await res.json();
}
