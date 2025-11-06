import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // 🔹 Leer usuarios actuales
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // 🔹 Verificar si el email ya existe
    const existe = usuarios.some((u) => u.email === email);
    if (existe) {
      setError("El correo ya está registrado");
      return;
    }

    // 🔹 Crear nuevo usuario
    const nuevoUsuario = {
      id: Date.now().toString(), // id único
      nombre,
      email,
      password,
      prefiereDarkMode: false,
    };

    // 🔹 Guardar en LocalStorage
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso 🎉");
    navigate("/login"); // Redirige a Login
  };

  return (
    <div className="form-container">
      <h2>Registrate</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
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
        <button type="submit">Crear cuenta</button>
      </form>

      <p>
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </div>
  );
}
