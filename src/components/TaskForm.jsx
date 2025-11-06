import { useState, useEffect } from "react";

export default function TaskForm({ onAdd, onEdit, mascotas = [], taskToEdit }) {
  const [mascotaId, setMascotaId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("");

  const tipos = ["Vacuna", "Alimentación", "Paseo", "Medicamento"];


  useEffect(() => {
    if (taskToEdit) {
      setMascotaId(taskToEdit.mascotaId);
      setTitulo(taskToEdit.titulo);
      setDescripcion(taskToEdit.descripcion);
      setFecha(taskToEdit.fecha);
      setTipo(taskToEdit.tipo);
    } else {
      setMascotaId("");
      setTitulo("");
      setDescripcion("");
      setFecha("");
      setTipo("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mascotaId || !titulo || !descripcion || !fecha || !tipo) return;

    const mascota = mascotas.find((m) => m.id === mascotaId);
    const tareaData = {
      mascotaId,
      mascotaNombre: mascota ? mascota.nombre : "",
      titulo,
      descripcion,
      fecha,
      tipo,
    };

    if (taskToEdit) {
      onEdit({ ...taskToEdit, ...tareaData });
    } else {
      onAdd(tareaData);
    }

   
    setMascotaId("");
    setTitulo("");
    setDescripcion("");
    setFecha("");
    setTipo("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <select value={mascotaId} onChange={(e) => setMascotaId(e.target.value)}>
        <option value="">Seleccioná una mascota</option>
        {mascotas.map((m) => (
          <option key={m.id} value={m.id}>{m.nombre}</option>
        ))}
      </select>

      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título de la tarea..."
      />
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción de la tarea..."
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="">Seleccioná tipo de tarea</option>
        {tipos.map((t, i) => (
          <option key={i} value={t}>{t}</option>
        ))}
      </select>

      <button type="submit">{taskToEdit ? "Guardar cambios" : "Agregar"}</button>
    </form>
  );
}
