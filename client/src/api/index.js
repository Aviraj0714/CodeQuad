const API_BASE_URL = 'http://localhost:5000/api';

export const getFiles = async () => {
    const response = await fetch(`${API_BASE_URL}/files`);
    return response.json();
};

export const createFile = async (file) => {
    const response = await fetch(`${API_BASE_URL}/files`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(file),
    });
    return response.json();
};
