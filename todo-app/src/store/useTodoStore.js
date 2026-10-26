import { create } from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  addTodo:(title) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), title: title, completed: false }],
    })),
  toggleTodo:(id) =>
    set((state)=> ({
        todos: state.todos.map((todo) => ({
            ...todo,
            completed: todo.id === id ? !todo.completed : todo.completed,
        })),
    })),
    deleteTodo:(id) =>
        set((state) =>({
            todos: state.todos.filter((todo) =>
            todo.id !== id
        )
        })),
    editTodo:(id, newTitle) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, title: newTitle } : todo
            ),
        })),    
  }));
export default useTodoStore;