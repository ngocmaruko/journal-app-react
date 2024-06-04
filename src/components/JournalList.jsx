// src/components/JournalList.jsx
import React from 'react';

// Inside JournalList component or wherever you have the delete functionality for journal entries
const JournalList = ({ entries, onEdit, onDelete}) => {
  return (
    <div>
      <h2>Journal List</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <span>{entry.text}</span>
            <button onClick={() => onEdit(entry)}>Edit</button>
            <button onClick={() => onDelete(entry.id)}>Delete</button>
             {/* Add this */}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default JournalList;
