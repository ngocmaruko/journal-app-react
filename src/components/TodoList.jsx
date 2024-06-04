// src/components/TodoList.jsx
import React from 'react';

const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => onEdit(todo)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
