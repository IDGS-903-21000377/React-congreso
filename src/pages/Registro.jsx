import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import "../style/registro.css";

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

  if (!formData.nombre || !formData.apellidos || !formData.email || !formData.ocupacion) {
    alert("Debes completar todos los campos obligatorios");
    return;
  }
  if (!formData.aceptar) {
    alert("Debes aceptar los términos y condiciones");
    return;
  }

  const payload = {
    nombre: formData.nombre.trim(),
    apellidos: formData.apellidos.trim(),
    email: formData.email.trim(),
    twitter: formData.twitter.trim() || "",
    ocupacion: formData.ocupacion.trim(),
    avatarUrl: formData.avatarUrl,
  };

  try {
    const res = await fetch("https://api-restjs.onrender.com/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json(); // <--- parseamos el JSON

    if (!res.ok) {
      console.error("Error del backend:", data);
      throw new Error(data.error || "Error al registrar participante");
    }

    alert("Participante registrado con éxito");
    navigate("/listado");
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Hubo un problema al registrar el participante: " + err.message);
  }
};


  return (
    <>
      <button
        className="btn btn-dark"
        style={{ position: "fixed", top: 10, right: 10, zIndex: 1100 }}
        onClick={toggleMenu}
      >
        ☰
      </button>

      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />

      <div className="registro-wrapper">
        <div className="registro-content">
          <h3 className="title">Registro de Participante</h3>

          <form onSubmit={handleSubmit}>
            {["nombre", "apellidos", "email", "ocupacion"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            ))}

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
                        border: formData.avatarUrl === avatar.url ? "3px solid green" : "2px solid #ccc",
                        cursor: "pointer",
                      }}
                      onClick={() => setFormData({ ...formData, avatarUrl: avatar.url })}
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

            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="aceptar"
                checked={formData.aceptar}
                onChange={handleChange}
                className="form-check-input"
                required
              />
              <label className="form-check-label">Leí y acepto los términos y condiciones</label>
            </div>

            <button type="submit" className="btn btn-success w-100 btn-lg">Guardar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registro;
