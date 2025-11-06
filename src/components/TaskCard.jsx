export default function TaskCard({ tarea, onDelete, setTaskToEdit }) {
  return (
    <div className="task-card">
      <p><strong>Mascota:</strong> {tarea.mascotaNombre}</p>
      <p><strong>Título:</strong> {tarea.titulo}</p>
      <p><strong>Descripción:</strong> {tarea.descripcion}</p>
      <p><strong>Tipo:</strong> {tarea.tipo}</p>
      <p><strong>Fecha:</strong> {tarea.fecha}</p>

      <div className="botones">
        <button onClick={() => setTaskToEdit(tarea)}>Editar</button>
        <button onClick={() => onDelete(tarea.id)}>Eliminar</button>
      </div>
    </div>
  );
}
