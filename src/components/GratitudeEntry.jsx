// src/components/GratitudeEntry.jsx
import React, { useState, useEffect } from 'react';

const GratitudeEntry = ({ onSave, currentGratitude, clearCurrentGratitude }) => {
  const [gratitude, setGratitude] = useState('');

  useEffect(() => {
    if (currentGratitude) {
      setGratitude(currentGratitude.text);
    } else {
      setGratitude('');
    }
  }, [currentGratitude]);

  const handleSave = () => {
    onSave(gratitude, currentGratitude ? currentGratitude.id : null);
    setGratitude('');
    clearCurrentGratitude();
  };

  return (
    <div>
      <h2>{currentGratitude ? 'Edit Gratitude' : 'New Gratitude'}</h2>
      <textarea
        value={gratitude}
        onChange={(e) => setGratitude(e.target.value)}
        placeholder="What are you grateful for today?"
      />
      <button onClick={handleSave}>{currentGratitude ? 'Update' : 'Save'}</button>
    </div>
  );
};

export default GratitudeEntry;
