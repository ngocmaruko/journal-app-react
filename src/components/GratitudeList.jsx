// src/components/GratitudeList.jsx
import React from 'react';

const GratitudeList = ({ gratitudes, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Gratitude Entries</h2>
      <ul>
        {gratitudes.map((gratitude) => (
          <li key={gratitude.id}>
            <p>{gratitude.date}</p>
            <p>{gratitude.text}</p>
            <button onClick={() => onEdit(gratitude)}>Edit</button>
            <button onClick={() => onDelete(gratitude.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GratitudeList;
