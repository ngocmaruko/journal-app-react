export const moveToTrash = (entries, setEntries, deletedEntries, setDeletedEntries, entry) => {
  const updatedEntries = entries.filter((e) => e.id !== entry.id);
  const updatedDeletedEntries = [...deletedEntries, entry];

  setEntries(updatedEntries);
  setDeletedEntries(updatedDeletedEntries);

  localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  localStorage.setItem('deletedEntries', JSON.stringify(updatedDeletedEntries));
};

export const restoreEntry = (deletedEntries, setDeletedEntries, todos, setTodos, gratitudes, setGratitudes, entry) => {
  const updatedDeletedEntries = deletedEntries.filter((e) => e.id !== entry.id);
  setDeletedEntries(updatedDeletedEntries);
  localStorage.setItem('deletedEntries', JSON.stringify(updatedDeletedEntries));

  if (entry.type === 'todo') {
    const updatedTodos = [...todos, entry];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  } else if (entry.type === 'gratitude') {
    const updatedGratitudes = [...gratitudes, entry];
    setGratitudes(updatedGratitudes);
    localStorage.setItem('gratitudes', JSON.stringify(updatedGratitudes));
  } else {
    const updatedEntries = [...entries, entry];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  }
};

export const clearTrash = (setDeletedEntries) => {
  setDeletedEntries([]);
  localStorage.removeItem('deletedEntries');
};
