import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleTodo,
  editTodo,
  clearTodos,
} from "../actions/todoActions";

export default () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };

  const handleEdit = (id, title) => {
    setEditId(id);
    setEditText(title);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      dispatch(editTodo(editId, editText));
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <div className="todo-app">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="todo-app__input"
        placeholder="Enter new task"
      />
      <button
        onClick={handleAddTodo}
        className="todo-app__button todo-app__button--add"
      >
        Add Task
      </button>
      <button
        onClick={() => dispatch(clearTodos())}
        className="todo-app__button todo-app__button--clear"
      >
        Clear All
      </button>

      <ul className="todo-app__task-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-app__task-item ${
              todo.completed ? "completed" : ""
            }`}
          >
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="todo-app__edit-input"
                  placeholder="Edit task"
                />
                <button
                  onClick={handleSaveEdit}
                  className="todo-app__button todo-app__button--edit"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  className="todo-app__task-text"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => handleEdit(todo.id, todo.title)}
                  className="todo-app__button todo-app__button--edit"
                >
                  Edit
                </button>
              </>
            )}
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="todo-app__button todo-app__button--delete"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
