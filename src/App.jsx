import React from "react";
import TodoApp from "./components/TodoList";

export default () => {
  return (
    <div className="App">
      <h1 className="todo__title">Todo List</h1>
      <TodoApp />
    </div>
  );
};
