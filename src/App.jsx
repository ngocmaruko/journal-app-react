import React, { useState, useEffect } from 'react';
import JournalEntry from './components/JournalEntry';
import JournalList from './components/JournalList';
import TodoList from './components/TodoList';
import TodoEntry from './components/TodoEntry';
import GratitudeEntry from './components/GratitudeEntry';
import GratitudeList from './components/GratitudeList';
import TrashEntry from './components/TrashEntry';
import AttachmentEntry from './components/AttachmentEntry';
import { saveEntry, editEntry, deleteEntry, clearCurrentEntry } from './utils/journalFunctions';
import { saveTodo, editTodo, deleteTodo, clearCurrentTodo } from './utils/todoFunctions';
import { saveGratitude, editGratitude, deleteGratitude, clearCurrentGratitude } from './utils/gratitudeFunctions';

const App = () => {
  const [entries, setEntries] = useState([]);
  const [todos, setTodos] = useState([]);
  const [gratitudes, setGratitudes] = useState([]);
  const [deletedEntries, setDeletedEntries] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentGratitude, setCurrentGratitude] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState('journal');

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const savedGratitudes = JSON.parse(localStorage.getItem('gratitudes')) || [];
    const savedDeletedEntries = JSON.parse(localStorage.getItem('deletedEntries')) || [];
    setEntries(savedEntries);
    setTodos(savedTodos);
    setGratitudes(savedGratitudes);
    setDeletedEntries(savedDeletedEntries);
  }, []);

  const handleFileUpload = (file) => {
    setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, file]);
  };

  const moveToTrash = (entry) => {
    entry.deletedDate = new Date().toLocaleDateString(); // Adding deletion date
    const updatedDeletedEntries = [...deletedEntries, entry];
    setDeletedEntries(updatedDeletedEntries);
    localStorage.setItem('deletedEntries', JSON.stringify(updatedDeletedEntries));

    if (entry.type === 'journal') {
      const updatedEntries = entries.filter((e) => e.id !== entry.id);
      setEntries(updatedEntries);
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    } else if (entry.type === 'todo') {
      const updatedTodos = todos.filter((e) => e.id !== entry.id);
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    } else if (entry.type === 'gratitude') {
      const updatedGratitudes = gratitudes.filter((e) => e.id !== entry.id);
      setGratitudes(updatedGratitudes);
      localStorage.setItem('gratitudes', JSON.stringify(updatedGratitudes));
    }
  };

  const restoreEntry = (entry) => {
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

  const clearTrash = () => {
    setDeletedEntries([]);
    localStorage.removeItem('deletedEntries');
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <button onClick={() => setSelectedFeature('journal')}>Journal</button>
        <button onClick={() => setSelectedFeature('todo')}>Todo List</button>
        <button onClick={() => setSelectedFeature('gratitude')}>Gratitude</button>
        <button onClick={() => setSelectedFeature('trash')}>Trash</button>
        <button onClick={() => setSelectedFeature('attachment')}>Attachment</button>
      </div>
      <div className="list-container">
        {selectedFeature === 'journal' && (
          <JournalList entries={entries} onEdit={(entry) => editEntry(setCurrentEntry, entry)} onDelete={(id) => deleteEntry(entries, setEntries, id, moveToTrash)} />
        )}
        {selectedFeature === 'todo' && (
          <TodoList todos={todos} onEdit={(todo) => editTodo(setCurrentTodo, todo)} onDelete={(id) => deleteTodo(todos, setTodos, id, moveToTrash)} />
        )}
        {selectedFeature === 'gratitude' && (
          <GratitudeList gratitudes={gratitudes} onEdit={(gratitude) => editGratitude(setCurrentGratitude, gratitude)} onDelete={(id) => deleteGratitude(gratitudes, setGratitudes, id, moveToTrash)} />
        )}
        {selectedFeature === 'trash' && (
          <TrashEntry entries={deletedEntries} restoreEntry={restoreEntry} clearTrash={clearTrash} />
        )}
        {selectedFeature === 'attachment' && (
          <AttachmentEntry onSave={handleFileUpload} />
        )}
      </div>
      <div className="entry-container">
        {selectedFeature === 'journal' && (
          <JournalEntry onSave={(text, gratitude, id) => saveEntry(entries, setEntries, text, gratitude, id)} currentEntry={currentEntry} clearCurrentEntry={() => clearCurrentEntry(setCurrentEntry)} />
        )}
        {selectedFeature === 'todo' && (
          <TodoEntry onSave={(text, id) => saveTodo(todos, setTodos, text, id)} currentTodo={currentTodo} clearCurrentTodo={() => clearCurrentTodo(setCurrentTodo)} />
        )}
        {selectedFeature === 'gratitude' && (
          <GratitudeEntry onSave={(text, id) => saveGratitude(gratitudes, setGratitudes, text, id)} currentGratitude={currentGratitude} clearCurrentGratitude={() => clearCurrentGratitude(setCurrentGratitude)} />
        )}
      </div>
    </div>
  );
};

export default App;
