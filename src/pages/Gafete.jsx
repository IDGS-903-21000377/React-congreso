import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/Gafete.css";

const QRDecorativo = () => (
  <div className="qr-decorativo">
    <div className="cuadro"></div>
    <div className="cuadro"></div>
    <div className="cuadro"></div>
    <div className="cuadro"></div>
  </div>
);

export default function Gafete() {
  const { id } = useParams();
  const [participante, setParticipante] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api-restjs.onrender.com/api/participante/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("No encontrado");
        return res.json();
      })
      .then(data => setParticipante(data))
      .catch(err => {
        console.error("Error al cargar participante", err);
        setError(true);
      });
  }, [id]);

  if (error) return <p className="text-center mt-5"> Participante no encontrado</p>;
  if (!participante) return <p className="text-center mt-5"> Cargando...</p>;

  const nombre = (participante.nombre || "SIN NOMBRE").toUpperCase();
  const carrera = (participante.ocupacion || "SIN CARRERA").toUpperCase();
  const foto = participante.avatarUrl || "/no-image.png";
  const email = participante.email || "Sin correo";
  const social1 = participante.twitter || "@Twitter";
  const social2 = participante.social2 || "@Instagram";
  const social3 = participante.social3 || "@Facebook";

  return (
    <div className="gafete-page-container">
      <div className="gafete-card-wrapper">

        {/* 🢒 Frontal */}
        <div className="gafete frontal">
          <div className="frontal-top-bg"></div>

          <div className="avatar-frame">
            <img className="avatar"
              src={foto}
              alt="Foto del participante"
            />
          </div>

          <h2 className="participante-nombre">{nombre}</h2>
          <p className="participante-carrera">{carrera}</p>
        </div>

        {/* 🢒 Trasera */}
        <div className="gafete trasera">
         <div className="qr-fake"></div>


          <div className="contact-info">
            <p>{email}</p>
            <p className="social">{social1}</p>
            <p className="social">{social2}</p>
            <p className="social">{social3}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
