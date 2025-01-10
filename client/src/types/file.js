export const FileSystemItem = {
    id: "",
    name: "",
    type: "file", // "file" or "directory"
    children: undefined,
    content: undefined,
    isOpen: undefined,
};

export const FileContext = {
    fileStructure: FileSystemItem,
    openFiles: [],
    activeFile: null,
    setActiveFile: (file) => {},
    closeFile: (fileId) => {},
    toggleDirectory: (dirId) => {},
    collapseDirectories: () => {},
    createDirectory: (parentDirId, name) => {},
    updateDirectory: (dirId, children) => {},
    renameDirectory: (dirId, newName) => {},
    deleteDirectory: (dirId) => {},
    createFile: (parentDirId, name) => {},
    updateFileContent: (fileId, content) => {},
    openFile: (fileId) => {},
    renameFile: (fileId, newName) => {},
    deleteFile: (fileId) => {},
    downloadFilesAndFolders: () => {},
};
