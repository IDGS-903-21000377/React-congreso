import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import { FaUsers, FaUserPlus } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleMenu }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '260px',
    height: '100%',
    background: "linear-gradient(180deg, #1e3c72, #2a5298)",
    color: "#fff",
    zIndex: 1050,
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.32s ease-in-out",
    paddingTop: "20px",
    paddingLeft: "10px",
  };

  const menuItemStyle = (active) => ({
    padding: "14px 25px",
    margin: "10px 10px 10px 0",
    borderRadius: "12px",
    backgroundColor: active ? "#ffffff33" : "transparent",
    color: "#fff",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    fontWeight: active ? "700" : "500",
    gap: "12px",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    backdropFilter: active ? "blur(6px)" : "none",
  });

  const hoverStyle = {
    backgroundColor: "#ffffff22",
    transform: "translateX(-4px)",
  };

  return (
    <>
      {/* Fondo detrás del sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1040,
          display: isOpen ? "block" : "none",
        }}
        onClick={toggleMenu}
      />

      <div style={sidebarStyle}>
        <nav className="d-flex flex-column">

          <Link
            to="/"
            style={menuItemStyle(isActive("/"))}
            onClick={toggleMenu}
            onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, menuItemStyle(isActive("/")))}
          >
            <AiOutlineHome size={24} /> Inicio
          </Link>

          <Link
            to="/listado"
            style={menuItemStyle(isActive("/listado"))}
            onClick={toggleMenu}
            onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, menuItemStyle(isActive("/listado")))}
          >
            <FaUsers size={24} /> Participantes
          </Link>

          <Link
            to="/registro"
            style={menuItemStyle(isActive("/registro"))}
            onClick={toggleMenu}
            onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, menuItemStyle(isActive("/registro")))}
          >
            <FaUserPlus size={24} /> Registro
          </Link>

        </nav>
      </div>
    </>
  );
};

export default Sidebar;
