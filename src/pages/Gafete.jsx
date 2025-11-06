import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/Gafete.css";

export default function Gafete() {
  const { id } = useParams();
  const [participante, setParticipante] = useState(null);

  useEffect(() => {
  fetch(`http://localhost:5151/api/participante/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("No encontrado");
      return res.json();
    })
    .then(data => setParticipante(data))
    .catch(err => console.error("Error al cargar participante", err));
}, [id]);

  if (!participante) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="gafete-container">
      {/* 🢒 Cara frontal */}
      <div className="gafete frontal">
        <img className="avatar" src={participante.foto} alt="avatar" />
        <h2>{participante.nombre}</h2>
        <p>{participante.email}</p>
        <p>{participante.carrera || "Carrera no asignada"}</p>
      </div>

      {/* 🢒 Cara trasera */}
      <div className="gafete trasera">
        <h3>Datos del Evento</h3>
        <p><strong>ID:</strong> {participante.id}</p>
        <p><strong>Registro:</strong> {participante.createdAt?.split("T")[0]}</p>

        <div className="qr-fake">QR</div>
        <small>Escanea para validar</small>
      </div>
    </div>
  );
}
