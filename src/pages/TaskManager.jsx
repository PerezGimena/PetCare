import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import TaskCard from "../components/TaskCard";
import "../styles/taskmanager.css";

export default function TaskManager() {
  const { usuario } = useContext(UserContext);
  const [tareas, setTareas] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [filter, setFilter] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);

  const getMascotas = () => (JSON.parse(localStorage.getItem("mascotas")) || []).filter(m => m.userId === usuario.id);
  const getTareas = () => (JSON.parse(localStorage.getItem("tareas")) || []).filter(t => t.userId === usuario.id);
  const saveTareas = (data) => localStorage.setItem("tareas", JSON.stringify(data));

  useEffect(() => {
    if (!usuario) return;
    setMascotas(getMascotas());
  }, [usuario]);

  useEffect(() => {
    if (!usuario) return;
    let tareasData = getTareas();
    // Asociar nombre de mascota
    tareasData = tareasData.map(t => {
      if (!t.mascotaNombre) {
        const mascota = mascotas.find(m => m.id === t.mascotaId);
        return { ...t, mascotaNombre: mascota ? mascota.nombre : "" };
      }
      return t;
    });
    setTareas(tareasData);
  }, [usuario, mascotas]);

  const addTask = (tarea) => {
    const allTareas = JSON.parse(localStorage.getItem("tareas")) || [];
    const nuevaTarea = { ...tarea, id: Date.now().toString(), userId: usuario.id };
    allTareas.push(nuevaTarea);
    saveTareas(allTareas);
    setTareas([...tareas, nuevaTarea]);
  };

  const editTask = (tareaEditada) => {
    let allTareas = JSON.parse(localStorage.getItem("tareas")) || [];
    allTareas = allTareas.map(t => t.id === tareaEditada.id ? { ...tareaEditada, userId: usuario.id } : t);
    saveTareas(allTareas);
    setTareas(allTareas.filter(t => t.userId === usuario.id));
    setTaskToEdit(null);
  };

  const deleteTask = (id) => {
    let allTareas = JSON.parse(localStorage.getItem("tareas")) || [];
    allTareas = allTareas.filter(t => t.id !== id);
    saveTareas(allTareas);
    setTareas(allTareas.filter(t => t.userId === usuario.id));
  };

  const tareasFiltradas = tareas.filter(t => {
    const f = filter.toLowerCase();
    return (
      (t.titulo || "").toLowerCase().includes(f) ||
      (t.descripcion || "").toLowerCase().includes(f) ||
      (t.mascotaNombre || "").toLowerCase().includes(f) ||
      (t.tipo || "").toLowerCase().includes(f)
    );
  });

  return (
    <>
      <Navbar />
      <div className="task-manager">
        <h1>Gestor de Tareas 📝</h1>

        <TaskForm onAdd={addTask} onEdit={editTask} mascotas={mascotas} taskToEdit={taskToEdit} />
        <TaskFilter filter={filter} setFilter={setFilter} />

        <div className="lista-tareas">
          {tareasFiltradas.length === 0 ? (
            <p>No hay tareas registradas. ¡Agregá tu primera Tarea!</p>
          ) : (
            tareasFiltradas.map(t => (
              <TaskCard key={t.id} tarea={t} onEdit={editTask} onDelete={deleteTask} setTaskToEdit={setTaskToEdit} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
