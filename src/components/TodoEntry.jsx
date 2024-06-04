// src/components/TodoEntry.jsx
import React, { useState, useEffect } from 'react';

const TodoEntry = ({ onSave, currentTodo, clearCurrentTodo }) => {
  const [todo, setTodo] = useState('');

  useEffect(() => {
    if (currentTodo) {
      setTodo(currentTodo.text);
    } else {
      setTodo('');
    }
  }, [currentTodo]);

  const handleSave = () => {
    onSave(todo, currentTodo ? currentTodo.id : null);
    setTodo('');
    clearCurrentTodo();
  };

  return (
    <div>
      <h2>{currentTodo ? 'Edit Todo' : 'New Todo'}</h2>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={handleSave}>{currentTodo ? 'Update' : 'Add'}</button>
    </div>
  );
};

export default TodoEntry;
