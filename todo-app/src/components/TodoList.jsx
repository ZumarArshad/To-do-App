
import { useState } from "react";
import useTodoStore from "../store/useTodoStore";

function TodoList() {
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTodo = useTodoStore((state) => state.editTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo(title.trim());
    setTitle("");
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleSave = (id) => {
    if (!editTitle.trim()) return;

    editTodo(id, editTitle.trim());
    setEditingId(null);
    setEditTitle("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task..."
        />
        <button type="submit">Add Task</button>
      </form>

      {todos.length === 0 ? (
        <p>No tasks yet. Add your first task!</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    autoFocus
                  />

                  <button
                    type="button"
                    onClick={() => handleSave(todo.id)}
                  >
                    Save
                  </button>

                  <button type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />

                    <span
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.title}
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleEdit(todo)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
