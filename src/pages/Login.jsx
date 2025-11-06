import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/auth.css";

export default function Login() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // 🔹 Leer usuarios directamente de LocalStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const user = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      login(user);
      navigate("/dashboard"); // Redirige al Dashboard
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
      </form>

      <p>
        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
      </p>
      <p className="back-landing" onClick={() => navigate("/")}>
        Volver a la Landing
      </p>
    </div>
  );
}
