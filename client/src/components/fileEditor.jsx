import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createFile } from '../api';

const FileEditor = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const handleSave = async () => {
        const newFile = { name, content };
        await createFile(newFile);
        alert('File saved successfully!');
    };

    return (
        <div className="file-editor">
            <h2>Edit File</h2>
            <input
                type="text"
                placeholder="File name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder="File content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default FileEditor;
