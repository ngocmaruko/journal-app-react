import React, { useState, useEffect } from 'react';

const TrashEntry = ({ entries, restoreEntry, clearTrash }) => {
  const [deletedEntries, setDeletedEntries] = useState(entries);

  useEffect(() => {
    setDeletedEntries(entries);
  }, [entries]);

  const handleRestore = (entry) => {
    restoreEntry(entry);
    setDeletedEntries((prevDeletedEntries) =>
      prevDeletedEntries.filter((e) => e.id !== entry.id)
    );
  };

  return (
    <div>
      <h2>Trash</h2>
      {deletedEntries.map((entry) => (
        <div key={entry.id}>
          <p>{entry.text}</p>
          <button onClick={() => handleRestore(entry)}>Restore</button>
        </div>
      ))}
      <button onClick={clearTrash}>Clear Trash</button>
    </div>
  );
};

export default TrashEntry;
