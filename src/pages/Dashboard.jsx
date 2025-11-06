import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { usuario } = useContext(UserContext);
  const [mascotas, setMascotas] = useState([]);
  const [form, setForm] = useState({ nombre: "", especie: "", edad: "", foto: "" });
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");

  if (!usuario) return <p>Cargando...</p>; 

  const getMascotas = () => {
    const data = JSON.parse(localStorage.getItem("mascotas")) || [];
    return data.filter(m => m.userId === usuario.id);
  };

  const saveMascotas = (data) => localStorage.setItem("mascotas", JSON.stringify(data));

  useEffect(() => {
    setMascotas(getMascotas());
  }, [usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.especie || !form.edad) {
      setError("Todos los campos son obligatorios");
      return;
    }

    let allMascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

    if (editando) {
      allMascotas = allMascotas.map(m => 
        m.id === editando ? { ...form, id: editando, userId: usuario.id } : m
      );
      setEditando(null);
    } else {
      const nuevo = { ...form, id: Date.now().toString(), userId: usuario.id };
      allMascotas.push(nuevo);
    }

    saveMascotas(allMascotas);
    setMascotas(allMascotas.filter(m => m.userId === usuario.id));
    setForm({ nombre: "", especie: "", edad: "", foto: "" });
    setError("");
  };

  const handleEdit = (m) => {
    setForm({ nombre: m.nombre, especie: m.especie, edad: m.edad, foto: m.foto || "" });
    setEditando(m.id);
  };

  const handleDelete = (id) => {
    let allMascotas = JSON.parse(localStorage.getItem("mascotas")) || [];
    allMascotas = allMascotas.filter(m => m.id !== id);
    saveMascotas(allMascotas);
    setMascotas(allMascotas.filter(m => m.userId === usuario.id));

    // Eliminar tareas asociadas
    let allTareas = JSON.parse(localStorage.getItem("tareas")) || [];
    allTareas = allTareas.filter(t => t.mascotaId !== id);
    localStorage.setItem("tareas", JSON.stringify(allTareas));
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>MIS MASCOTAS 🐾</h1>
        <form onSubmit={handleSubmit} className="formulario">
          <input 
            type="text" 
            placeholder="Nombre" 
            value={form.nombre} 
            onChange={e => setForm({ ...form, nombre: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Especie" 
            value={form.especie} 
            onChange={e => setForm({ ...form, especie: e.target.value })} 
          />
          <input 
            type="number" 
            placeholder="Edad" 
            value={form.edad} 
            onChange={e => setForm({ ...form, edad: e.target.value })} 
          />

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input 
              type="file" 
              id="foto" 
              accept="image/*" 
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setForm({ ...form, foto: reader.result, fileName: file.name });
                  reader.readAsDataURL(file);
                }
              }} 
            />
            <label htmlFor="foto" className="file-label">Seleccionar Foto</label>
            {form.fileName && <span style={{ fontSize: "0.9rem" }}>{form.fileName}</span>}
          </div>

          {error && <p className="error">{error}</p>}
          <button type="submit">{editando ? "Guardar Cambios" : "Agregar Mascota"}</button>
        </form>

        <div className="lista-mascotas">
          {mascotas.length === 0 ? (
            <p className="vacio">Hola {usuario?.nombre} 🐶 No tenés mascotas aún. ¡Agregá tu primera Mascota!</p>
          ) : (
            mascotas.map(m => (
              <div key={m.id} className="card">
                {m.foto && (
                  <img 
                    src={m.foto.startsWith("data:") ? m.foto : process.env.PUBLIC_URL + m.foto} 
                    alt={m.nombre} 
                    className="mascota-foto" 
                  />
                )}
                <h3>{m.nombre}</h3>
                <p>{m.especie} - {m.edad} años</p>
                <button onClick={() => handleEdit(m)}>Editar</button>
                <button onClick={() => handleDelete(m.id)}>Eliminar</button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
