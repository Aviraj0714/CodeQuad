// lang-map.js
const langMap = () => {
    return {
        languages: {
            // Example data for languages mapping
            'js': ['javascript', 'nodejs'],
            'py': ['python'],
        },
        extensions: {
            'javascript': ['.js', '.mjs'],
            'python': ['.py'],
        }
    };
};

langMap.languages = (extension) => {
    const map = langMap();
    for (const language in map.languages) {
        if (map.languages[language].includes(extension)) {
            return [language];
        }
    }
    return [];
};

langMap.extensions = (language) => {
    const map = langMap();
    return map.extensions[language] || [];
};

export default langMap;
