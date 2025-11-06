import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Inicializar datos de ejemplo
  useEffect(() => {
    // Usuarios de ejemplo
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuariosGuardados.length === 0) {
      const usuarios = [
        { id: "6895", nombre: "Maria", email: "perez@gmail.com", password: "1234", prefiereDarkMode: false },
        { id: "dd46", nombre: "Bautista", email: "bdiaz@gmail.com", password: "gimena", prefiereDarkMode: false },
        { id: "7396", nombre: "Camila", email: "camilaperez@gmail.com", password: "camiperez", prefiereDarkMode: false }
      ];
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // Mascotas de ejemplo
    const mascotasGuardadas = JSON.parse(localStorage.getItem("mascotas")) || [];
    if (mascotasGuardadas.length === 0) {
      const mascotas = [
        { id: "0659", nombre: "Oso", especie: "Perro", edad: 3, foto: "/osito.jpg", userId: "6895" },
        { id: "c097", nombre: "Moly", especie: "Gato", edad: 2, foto: "", userId: "6895" }
      ];
      localStorage.setItem("mascotas", JSON.stringify(mascotas));
    }

    // Tareas de ejemplo
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    if (tareasGuardadas.length === 0) {
      const tareas = [
        {
          id: "5e22",
          mascotaId: "0659",
          mascotaNombre: "Oso",
          titulo: "Vacunar a Osito",
          descripcion: "Vacuna Antirrabica",
          fecha: "2025-11-25",
          tipo: "Vacuna",
          userId: "6895"
        },
        {
          id: "aaf2",
          mascotaId: "c097",
          mascotaNombre: "Moly",
          titulo: "Alimentar a Moly",
          descripcion: "Darle pescado con arroz a las 14hs",
          fecha: "2025-11-07",
          tipo: "Alimentación",
          userId: "6895"
        }
      ];
      localStorage.setItem("tareas", JSON.stringify(tareas));
    }
  }, []);

  // Cargar usuario guardado y aplicar dark mode
  useEffect(() => {
    const guardado = localStorage.getItem("usuario");
    if (guardado) {
      const userData = JSON.parse(guardado);
      setUsuario(userData);

      if (userData.prefiereDarkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    }
    setCargando(false);
  }, []);

  // Login
  const login = (userData) => {
    setUsuario(userData);
    localStorage.setItem("usuario", JSON.stringify(userData));

    if (userData.prefiereDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  // Logout
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    document.body.classList.remove("dark-mode");
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    if (usuario) {
      const actualizado = {
        ...usuario,
        prefiereDarkMode: document.body.classList.contains("dark-mode"),
      };
      setUsuario(actualizado);
      localStorage.setItem("usuario", JSON.stringify(actualizado));
    }
  };

  // Obtener todos los usuarios (para login)
  const getUsuarios = () => JSON.parse(localStorage.getItem("usuarios")) || [];

  return (
    <UserContext.Provider value={{ usuario, login, logout, cargando, toggleDarkMode, getUsuarios }}>
      {children}
    </UserContext.Provider>
  );
}
