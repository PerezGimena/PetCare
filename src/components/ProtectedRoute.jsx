import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { usuario, cargando } = useContext(UserContext);

  if (cargando) return <p>Cargando...</p>;
  if (!usuario) return <Navigate to="/login" />;

  return children;
}
