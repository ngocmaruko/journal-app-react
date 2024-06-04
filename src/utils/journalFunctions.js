export const saveEntry = (entries, setEntries, text, gratitude, id) => {
  let updatedEntries;
  if (id) {
    updatedEntries = entries.map(entry =>
      entry.id === id ? { ...entry, text, gratitude } : entry
    );
  } else {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      text,
      gratitude,
      type: 'journal'
    };
    updatedEntries = [...entries, newEntry];
  }
  setEntries(updatedEntries);
  localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
};

export const editEntry = (setCurrentEntry, entry) => {
  setCurrentEntry(entry);
};

export const deleteEntry = (entries, setEntries, id, moveToTrash) => {
  const deletedEntry = entries.find(entry => entry.id === id);
  moveToTrash(deletedEntry); // Move to trash
  const updatedEntries = entries.filter(entry => entry.id !== id);
  setEntries(updatedEntries);
  localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
};

export const clearCurrentEntry = (setCurrentEntry) => {
  setCurrentEntry(null);
};
