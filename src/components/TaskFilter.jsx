export default function TaskFilter({ filter, setFilter }) {
  return (
    <div className="task-filter">
      <input
        placeholder="Filtrar tareas por título, descripción, mascota o tipo..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}
