export const saveTodo = (todos, setTodos, text, id) => {
  let updatedTodos;
  const newTodo = {
    id: id || Date.now(),
    text,
    completed: false,
    type: 'todo'
  };

  if (id) {
    updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    );
  } else {
    updatedTodos = [...todos, newTodo];
  }

  setTodos(updatedTodos);
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
};

export const editTodo = (setCurrentTodo, todo) => {
  setCurrentTodo(todo);
};

export const deleteTodo = (todos, setTodos, id, moveToTrash) => {
  const deletedTodo = todos.find(todo => todo.id === id);
  moveToTrash(deletedTodo); // Move to trash
  const updatedTodos = todos.filter(todo => todo.id !== id);
  setTodos(updatedTodos);
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
};

export const clearCurrentTodo = (setCurrentTodo) => {
  setCurrentTodo(null);
};

