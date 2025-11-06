import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import "../style/registro.css"; // Estilos específicos de registro

const AVATARS = [
  { id: "avatar1", url: "../../media/user1.png" },
  { id: "avatar2", url: "../../media/user2.png" },
  { id: "avatar3", url: "../../media/user3.png" },
];

const Registro = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    twitter: "",
    ocupacion: "",
    avatarUrl: AVATARS[0].url,
    aceptar: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.aceptar) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    try {
      const res = await fetch("http://localhost:5151/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Error al registrar participante");

      alert("Participante registrado con éxito");
      navigate("/listado");
    } catch (err) {
      console.error(err);
      alert("Hubo un problema al registrar el participante");
    }
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="btn btn-dark"
        style={{ position: "fixed", top: 10, right: 10, zIndex: 1100 }}
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />

      {/* Contenedor principal */}
      <div className="registro-wrapper">
        <div className="registro-content">
          <h3 className="title">Registro de Participante</h3>

          <form onSubmit={handleSubmit}>
            {/* Campos de texto */}
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellidos:</label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Twitter:</label>
              <input
                type="text"
                name="twitter"
                placeholder="@usuario"
                value={formData.twitter}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Ocupación:</label>
              <input
                type="text"
                name="ocupacion"
                value={formData.ocupacion}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Selección de avatar */}
            <div className="mb-4">
              <label className="d-block mb-3">Seleccionar Avatar:</label>
              <div className="avatar-selection">
                {AVATARS.map((avatar, index) => (
                  <label key={avatar.id} className="text-center">
                    <img
                      src={avatar.url}
                      alt={`avatar ${index + 1}`}
                      width="60"
                      height="60"
                      style={{
                        border:
                          formData.avatarUrl === avatar.url
                            ? "3px solid green"
                            : "2px solid #ccc",
                      }}
                      onClick={() =>
                        setFormData({ ...formData, avatarUrl: avatar.url })
                      }
                    />
                    <br />
                    <input
                      type="radio"
                      name="avatarUrl"
                      value={avatar.url}
                      checked={formData.avatarUrl === avatar.url}
                      onChange={handleChange}
                      className="form-check-input mt-2"
                    />
                    <span className="ms-1">Avatar {index + 1}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Checkbox */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="aceptar"
                checked={formData.aceptar}
                onChange={handleChange}
                className="form-check-input"
                required
              />
              <label className="form-check-label">
                Leí y acepto los términos y condiciones
              </label>
            </div>

            {/* Botón enviar */}
            <button type="submit" className="btn btn-success w-100 btn-lg">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registro;
