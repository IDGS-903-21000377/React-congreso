import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import "../style/listado.css";

const Participantes = () => {
  const [participantes, setParticipantes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleMenu = () => setIsSidebarOpen(!isSidebarOpen);

  const obtenerParticipantes = async (texto = "") => {
    try {
      const res = await fetch(
        `https://api-restjs.onrender.com/api/listado${texto ? `?q=${texto}` : ""}`
      );
      const data = await res.json();

      // Mapear campos a camelCase y construir rutas de avatar correctas.
      const participantesFormateados = data.map((p) => {
        const avatarValue = p.AvatarUrl ?? p.avatarUrl;
        let finalAvatarUrl;

        if (avatarValue && avatarValue.startsWith("http")) {
          finalAvatarUrl = avatarValue;
        } else {
          // Extraer solo el nombre del archivo de rutas como '../../media/user1.png'
          const avatarFileName = avatarValue ? avatarValue.split("/").pop() : "user1.png";
          finalAvatarUrl = `/media/${avatarFileName}`;
        }

        return {
          ...p, // Copiamos todas las propiedades por si vienen en camelCase
          id: p.Id ?? p.id,
          nombre: p.Nombre ?? p.nombre,
          apellidos: p.Apellidos ?? p.apellidos,
          email: p.Email ?? p.email,
          ocupacion: p.Ocupacion ?? p.ocupacion,
          twitter: p.Twitter ?? p.twitter,
          avatarUrl: finalAvatarUrl,
        };
      });

      setParticipantes(participantesFormateados);
    } catch (err) {
      console.error("Error al obtener participantes", err);
    }
  };

  useEffect(() => {
    const query = searchParams.get("q") || "";
    obtenerParticipantes(query);
  }, [searchParams]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchParams(value ? { q: value } : {});
  };

  return (
    <div className="listado-wrapper">
      <button className="btn btn-outline-dark mb-3" onClick={toggleMenu}>
        ☰ Menú
      </button>

      <Sidebar isOpen={isSidebarOpen} toggleMenu={toggleMenu} />

      <h2 className="listado-title">Listado de Participantes</h2>

      <input
        type="text"
        className="form-control search-input"
        placeholder="Buscar por nombre o email..."
        onChange={handleSearch}
        defaultValue={searchParams.get("q") || ""}
      />

      <div className="cards-container mt-4">
        {participantes.map((item) => (
          <div key={item.id} className="card shadow-sm p-3">
            <div className="text-center">
              <Link to={`/gafete/${item.id}`}>
                <img
                  src={item.avatarUrl}
                  alt="avatar"
                  className="rounded-circle mb-3"
                />
              </Link>

              <h5>
                {item.nombre} {item.apellidos}
              </h5>

              <p className="text-muted mb-1">{item.ocupacion}</p>
              <p className="small text-secondary">{item.email}</p>

              <Link to={`/gafete/${item.id}`} className="btn-gafete">
                Ver Gafete
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Link to="/registro" className="btn btn-success btn-lg w-100 mt-4">
        + Registrar participante
      </Link>
    </div>
  );
};

export default Participantes;
