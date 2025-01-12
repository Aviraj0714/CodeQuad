// Example of the structure in JavaScript
const Language = {
    language: "",
    version: "",
    aliases: []
};

const RunContext = {
    setInput: (input) => {
        // Implement logic to set input
    },
    output: "",
    isRunning: false,
    supportedLanguages: [Language],  // Example array of supported languages
    selectedLanguage: Language,  // Example selected language
    setSelectedLanguage: (language) => {
        // Implement logic to set the selected language
    },
    runCode: () => {
        // Implement logic to run the code
    }
};

export { Language, RunContext };
