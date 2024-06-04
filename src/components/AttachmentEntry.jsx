// src/components/AttachmentEntry.jsx
import React, { useState } from 'react';

const AttachmentEntry = ({ onSave }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Logic to upload file
    onSave(selectedFile);
  };

  return (
    <div>
      <h2>Add Attachment</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AttachmentEntry;
