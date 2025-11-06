import { Link } from "react-router-dom";
import logoUTL from "../../media/utl.jpg";
import logoTIC from "../../media/congreso.png";
import "../style/Home.css";

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-content">
        
        {/* LOGOS */}
        <div className="logos-container">
          <img src={logoUTL} alt="Logo UTL" className="logo" />
          <img src={logoTIC} alt="Logo TIC" className="logo" />
        </div>

        {/* TEXTO */}
        <h2 className="subtitle">Congreso de</h2>
        <h1 className="title">Tecnologías de la Información</h1>

        {/* BOTÓN */}
        <Link to="/listado" className="btn-enter">
          Entrar
        </Link>
      </div>
    </div>
  );
}
