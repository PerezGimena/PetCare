import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { usuario, logout, toggleDarkMode } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>🐾 PetCare</h2>
      <div>
        {usuario && <span>Hola, {usuario.nombre}</span>}
        <Link to="/dashboard">Mis Mascotas</Link>
        <Link to="/tasks">Gestor de Tareas</Link>

        {/* Botón para el modo oscuro/claro */}
        <button onClick={toggleDarkMode}>
          {document.body.classList.contains("dark-mode") ? "Modo Claro" : "Modo Oscuro"}
        </button>

        {usuario && <button onClick={handleLogout}>Cerrar sesión</button>}
      </div>
    </nav>
  );
}
