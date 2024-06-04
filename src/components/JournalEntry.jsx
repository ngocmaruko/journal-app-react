// src/components/JournalEntry.jsx
import React, { useState, useEffect } from 'react';

const JournalEntry = ({ onSave, currentEntry, clearCurrentEntry }) => {
  const [entry, setEntry] = useState('');
  const [gratitude, setGratitude] = useState('');

  useEffect(() => {
    if (currentEntry) {
      setEntry(currentEntry.text);
      setGratitude(currentEntry.gratitude);
    } else {
      setEntry('');
      setGratitude('');
    }
  }, [currentEntry]);

  const handleSave = () => {
    onSave(entry, gratitude, currentEntry ? currentEntry.id : null);
    setEntry('');
    setGratitude('');
    clearCurrentEntry();
  };

  return (
    <div>
      <h2>{currentEntry ? 'Edit Journal Entry' : 'New Journal Entry'}</h2>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your thoughts here..."
      />
      <h2>Gratitude Session</h2>
      <textarea
        value={gratitude}
        onChange={(e) => setGratitude(e.target.value)}
        placeholder="What are you grateful for today?"
      />
      <button onClick={handleSave}>{currentEntry ? 'Update' : 'Save'}</button>
    </div>
  );
};

export default JournalEntry;
