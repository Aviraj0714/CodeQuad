import React, { useEffect, useState } from 'react';
import { getFiles } from '../api';

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const data = await getFiles();
            setFiles(data);
        };
        fetchFiles();
    }, []);

    return (
        <div className="file-list">
            <h2>Your Files</h2>
            <ul>
                {files.map((file) => (
                    <li key={file._id}>
                        <a href={`/editor/${file._id}`}>{file.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
