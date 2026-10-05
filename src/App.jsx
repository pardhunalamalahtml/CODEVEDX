import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("codevedx-tasks")) || [];
    } catch {
      return [];
    }
  });

  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [dark, setDark] = useState(false);
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    localStorage.setItem("codevedx-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function saveTask() {
    const value = text.trim();
    if (!value) return;
    if (editingId !== null) {
      setTasks(tasks.map(task =>
        task.id === editingId ? { ...task, text: value } : task
      ));
      setEditingId(null);
    } else {
      setTasks([
        ...tasks,
        { id: Date.now(), text: value, completed: false }
      ]);
    }
    setText("");
  }

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setText("");
    }
  }

  function startEdit(task) {
    setText(task.text);
    setEditingId(task.id);
  }

  const visibleTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed===true;
    if (filter === "pending") return !task.completed===false;
    return true;
  });

  const pendingCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;
  return (
    <main className={dark ? "app dark" : "app"}>
      <section className="card">
        <header className="top">
          <div>
            <p className="tag"></p>
            <h1>Task Manager</h1>
            <p className="subtitle">Keep your daily tasks simple and organized.</p>
          </div>
          <button className="theme-btn" onClick={() => setDark(!dark)}>
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        <div className="input-row">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && saveTask()}
            placeholder="Enter a task..."
          />
          <button className="add-btn" onClick={saveTask}>
            {editingId !== null ? "Update" : "Add Task"}
          </button>
        </div>

        <div className="stats">
          <span>{tasks.length} Total</span>
          <span>{pendingCount} Pending</span>
          <span>{completedCount} Completed</span>
        </div>

        <nav className="filters">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
            All
          </button>
          <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>
            Pending
          </button>
          <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
            Completed
          </button>
        </nav>

        <div className="task-list">
          {visibleTasks.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">✓</div>
              <h2>No tasks here</h2>
              <p>Add a task above to get started.</p>
            </div>
          ) : (
            visibleTasks.map(task => (
              <article className="task" key={task.id}>
                <button
                  className={task.completed ? "check checked" : "check"}
                  onClick={() => toggleTask(task.id)}
                  aria-label={task.completed ? "Mark pending" : "Mark completed"}
                >
                  {task.completed ? "✓" : ""}
                </button>

                <span className={task.completed ? "task-text completed" : "task-text"}>
                  {task.text}
                </span>

                <div className="actions">
                  <button onClick={() => startEdit(task)}>Edit</button>
                  <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </article>
            ))
          )}
        </div>

        <footer>
          Tasks are saved automatically in your browser.
        </footer>
      </section>
    </main>
  );
}

export default App;
