import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-hot-toast";
import React, { useEffect, } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";
import { SocketEvent } from "./socketEvents"; // Assuming you have this imported


const [fileStructure, setFileStructure] = useState(initialFileStructure);

const initialOpenFiles = fileStructure.children ? fileStructure.children : [];
const [openFiles, setOpenFiles] = useState(initialOpenFiles);
const [activeFile, setActiveFile] = useState(openFiles[0] || null);

// Function to toggle the isOpen property of a directory (Directory Open/Close)
const toggleDirectory = (dirId) => {
    const toggleDir = (directory) => {
        if (directory.id === dirId) {
            return {
                ...directory,
                isOpen: !directory.isOpen,
            };
        } else if (directory.children) {
            return {
                ...directory,
                children: directory.children.map(toggleDir),
            };
        } else {
            return directory;
        }
    };

    // Update fileStructure with the opened directory
    setFileStructure((prevFileStructure) => toggleDir(prevFileStructure));
};

const collapseDirectories = () => {
    const collapseDir = (directory) => {
        return {
            ...directory,
            isOpen: false,
            children: directory.children?.map(collapseDir),
        };
    };

    setFileStructure((prevFileStructure) => collapseDir(prevFileStructure));
};

const createDirectory = useCallback(
    (parentDirId, newDir, sendToSocket = true) => {
        let newDirectory;
        if (typeof newDir === "string") {
            newDirectory = {
                id: uuidv4(),
                name: newDir,
                type: "directory",
                children: [],
                isOpen: false,
            };
        } else {
            newDirectory = newDir;
        }

        if (!parentDirId) parentDirId = fileStructure.id;

        const addDirectoryToParent = (directory) => {
            if (directory.id === parentDirId) {
                // If the current directory matches the parent, add new directory to its children
                return {
                    ...directory,
                    children: [...(directory.children || []), newDirectory],
                };
            } else if (directory.children) {
                // If it's not the parent directory, recursively update children
                return {
                    ...directory,
                    children: directory.children.map(addDirectoryToParent),
                };
            } else {
                // Return the directory as is if it has no children
                return directory;
            }
        };

        setFileStructure((prevFileStructure) =>
            addDirectoryToParent(prevFileStructure)
        );

        if (!sendToSocket) return newDirectory.id;
        socket.emit("DIRECTORY_CREATED", {
            parentDirId,
            newDirectory,
        });

        return newDirectory.id;
    },
    [fileStructure.id, socket]
);


const updateDirectory = useCallback(
    (dirId, children, sendToSocket = true) => {
        if (!dirId) dirId = fileStructure.id;

        const updateChildren = (directory) => {
            if (directory.id === dirId) {
                return {
                    ...directory,
                    children,
                };
            } else if (directory.children) {
                return {
                    ...directory,
                    children: directory.children.map(updateChildren),
                };
            } else {
                return directory;
            }
        };

        setFileStructure((prevFileStructure) =>
            updateChildren(prevFileStructure)
        );

        // Close all open files in the directory being updated
        setOpenFiles([]);

        // Set the active file to null if it's in the directory being updated
        setActiveFile(null);

        if (dirId === fileStructure.id) {
            toast.dismiss();
            toast.success("Files and folders updated");
        }

        if (!sendToSocket) return;
        socket.emit("DIRECTORY_UPDATED", {
            dirId,
            children,
        });
    },
    [fileStructure.id, socket]
);

const renameDirectory = useCallback(
    (dirId, newDirName, sendToSocket = true) => {
        const renameInDirectory = (directory) => {
            if (directory.type === "directory" && directory.children) {
                // Check if a directory with the new name already exists
                const isNameTaken = directory.children.some(
                    (item) =>
                        item.type === "directory" &&
                        item.name === newDirName &&
                        item.id !== dirId
                );

                if (isNameTaken) {
                    return null; // Name is already taken
                }

                return {
                    ...directory,
                    children: directory.children.map((item) => {
                        if (item.id === dirId) {
                            return {
                                ...item,
                                name: newDirName,
                            };
                        } else if (item.type === "directory") {
                            // Recursively update nested directories
                            const updatedNestedDir = renameInDirectory(item);
                            return updatedNestedDir !== null
                                ? updatedNestedDir
                                : item;
                        } else {
                            return item;
                        }
                    }),
                };
            } else {
                return directory;
            }
        };

        const updatedFileStructure = renameInDirectory(fileStructure);

        if (updatedFileStructure === null) {
            return false;
        }

        setFileStructure(updatedFileStructure);

        if (!sendToSocket) return true;
        socket.emit("DIRECTORY_RENAMED", {
            dirId,
            newDirName,
        });

        return true;
    },
    [socket, setFileStructure, fileStructure]
);



const FileContext = React.createContext();

const FileProvider = ({ children }) => {
    const [fileStructure, setFileStructure] = useState(null);
    const [openFiles, setOpenFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(null);
    const [users, setUsers] = useState([]);
    const [drawingData, setDrawingData] = useState([]);
    const socket = useSocket(); // Assume a hook to get the socket instance
    const toast = useToast(); // Assuming a toast notification system is in use

    const updateDirectory = useCallback(
        (dirId, children, sendToSocket = true) => {
            if (!dirId) dirId = fileStructure.id;

            const updateChildren = (directory) => {
                if (directory.id === dirId) {
                    return {
                        ...directory,
                        children,
                    };
                } else if (directory.children) {
                    return {
                        ...directory,
                        children: directory.children.map(updateChildren),
                    };
                } else {
                    return directory;
                }
            };

            setFileStructure((prevFileStructure) =>
                updateChildren(prevFileStructure)
            );

            setOpenFiles([]);
            setActiveFile(null);

            if (dirId === fileStructure.id) {
                toast.dismiss();
                toast.success("Files and folders updated");
            }

            if (!sendToSocket) return;
            socket.emit(SocketEvent.DIRECTORY_UPDATED, {
                dirId,
                children,
            });
        },
        [fileStructure.id, socket]
    );

    const renameDirectory = useCallback(
        (dirId, newDirName, sendToSocket = true) => {
            const renameInDirectory = (directory) => {
                if (directory.type === "directory" && directory.children) {
                    const isNameTaken = directory.children.some(
                        (item) =>
                            item.type === "directory" &&
                            item.name === newDirName &&
                            item.id !== dirId
                    );

                    if (isNameTaken) {
                        return null; // Name is already taken
                    }

                    return {
                        ...directory,
                        children: directory.children.map((item) => {
                            if (item.id === dirId) {
                                return {
                                    ...item,
                                    name: newDirName,
                                };
                            } else if (item.type === "directory") {
                                const updatedNestedDir = renameInDirectory(item);
                                return updatedNestedDir !== null
                                    ? updatedNestedDir
                                    : item;
                            } else {
                                return item;
                            }
                        }),
                    };
                } else {
                    return directory;
                }
            };

            const updatedFileStructure = renameInDirectory(fileStructure);

            if (updatedFileStructure === null) {
                return false;
            }

            setFileStructure(updatedFileStructure);

            if (!sendToSocket) return true;
            socket.emit(SocketEvent.DIRECTORY_RENAMED, {
                dirId,
                newDirName,
            });

            return true;
        },
        [socket, setFileStructure, fileStructure]
    );

    const deleteDirectory = useCallback(
        (dirId, sendToSocket = true) => {
            const deleteFromDirectory = (directory) => {
                if (directory.type === "directory" && directory.id === dirId) {
                    return null;
                } else if (directory.children) {
                    const updatedChildren = directory.children
                        .map(deleteFromDirectory)
                        .filter((item) => item !== null);
                    return {
                        ...directory,
                        children: updatedChildren,
                    };
                } else {
                    return directory;
                }
            };

            setFileStructure((prevFileStructure) =>
                deleteFromDirectory(prevFileStructure)
            );

            if (!sendToSocket) return;
            socket.emit(SocketEvent.DIRECTORY_DELETED, { dirId });
        },
        [socket]
    );

    const openFile = (fileId) => {
        const file = getFileById(fileStructure, fileId);

        if (file) {
            updateFileContent(activeFile?.id || "", activeFile?.content || "");

            if (!openFiles.some((file) => file.id === fileId)) {
                setOpenFiles((prevOpenFiles) => [...prevOpenFiles, file]);
            }

            setOpenFiles((prevOpenFiles) =>
                prevOpenFiles.map((file) => {
                    if (file.id === activeFile?.id) {
                        return {
                            ...file,
                            content: activeFile.content || "",
                        };
                    } else {
                        return file;
                    }
                })
            );

            setActiveFile(file);
        }
    };

    const closeFile = (fileId) => {
        if (fileId === activeFile?.id) {
            updateFileContent(activeFile.id, activeFile.content || "");
            const fileIndex = openFiles.findIndex((file) => file.id === fileId);

            if (fileIndex !== -1 && openFiles.length > 1) {
                if (fileIndex > 0) {
                    setActiveFile(openFiles[fileIndex - 1]);
                } else {
                    setActiveFile(openFiles[fileIndex + 1]);
                }
            } else {
                setActiveFile(null);
            }
        }

        setOpenFiles((prevOpenFiles) =>
            prevOpenFiles.filter((openFile) => openFile.id !== fileId)
        );
    };

    const createFile = useCallback(
        (parentDirId, file, sendToSocket = true) => {
            let num = 1;

            if (!parentDirId) parentDirId = fileStructure.id;

            const parentDir = findParentDirectory(fileStructure, parentDirId);
            if (!parentDir) throw new Error("Parent directory not found");

            let newFile;

            if (typeof file === "string") {
                let name = file;
                let fileExists = isFileExist(parentDir, name);
                while (fileExists) {
                    name = `${name.split(".")[0]}(${num}).${name.split(".")[1]}`;
                    fileExists = isFileExist(parentDir, name);
                    num++;
                }

                newFile = {
                    id: uuidv4(),
                    name,
                    type: "file",
                    content: "",
                };
            } else {
                newFile = file;
            }

            const updateDirectory = (directory) => {
                if (directory.id === parentDir.id) {
                    return {
                        ...directory,
                        children: [...(directory.children || []), newFile],
                        isOpen: true,
                    };
                } else if (directory.children) {
                    return {
                        ...directory,
                        children: directory.children.map(updateDirectory),
                    };
                } else {
                    return directory;
                }
            };

            setFileStructure((prevFileStructure) =>
                updateDirectory(prevFileStructure)
            );

            setOpenFiles((prevOpenFiles) => [...prevOpenFiles, newFile]);

            setActiveFile(newFile);

            if (!sendToSocket) return newFile.id;
            socket.emit(SocketEvent.FILE_CREATED, {
                parentDirId,
                newFile,
            });

            return newFile.id;
        },
        [fileStructure, socket]
    );

    const updateFileContent = useCallback(
        (fileId, newContent) => {
            const updateFile = (directory) => {
                if (directory.type === "file" && directory.id === fileId) {
                    return {
                        ...directory,
                        content: newContent,
                    };
                } else if (directory.children) {
                    return {
                        ...directory,
                        children: directory.children.map(updateFile),
                    };
                } else {
                    return directory;
                }
            };

            setFileStructure((prevFileStructure) =>
                updateFile(prevFileStructure)
            );

            if (openFiles.some((file) => file.id === fileId)) {
                setOpenFiles((prevOpenFiles) =>
                    prevOpenFiles.map((file) => {
                        if (file.id === fileId) {
                            return {
                                ...file,
                                content: newContent,
                            };
                        } else {
                            return file;
                        }
                    })
                );
            }
        },
        [openFiles]
    );

    const renameFile = useCallback(
        (fileId, newName, sendToSocket = true) => {
            const renameInDirectory = (directory) => {
                if (directory.type === "directory" && directory.children) {
                    return {
                        ...directory,
                        children: directory.children.map((item) => {
                            if (item.type === "file" && item.id === fileId) {
                                return {
                                    ...item,
                                    name: newName,
                                };
                            } else {
                                return item;
                            }
                        }),
                    };
                } else {
                    return directory;
                }
            };

            setFileStructure((prevFileStructure) =>
                renameInDirectory(prevFileStructure)
            );

            setOpenFiles((prevOpenFiles) =>
                prevOpenFiles.map((file) => {
                    if (file.id === fileId) {
                        return {
                            ...file,
                            name: newName,
                        };
                    } else {
                        return file;
                    }
                })
            );

            if (fileId === activeFile?.id) {
                setActiveFile((prevActiveFile) => {
                    if (prevActiveFile) {
                        return {
                            ...prevActiveFile,
                            name: newName,
                        };
                    } else {
                        return null;
                    }
                });
            }

            if (!sendToSocket) return true;
            socket.emit(SocketEvent.FILE_RENAMED, {
                fileId,
                newName,
            });

            return true;
        },
        [activeFile?.id, socket]
    );

    const deleteFile = useCallback(
        (fileId, sendToSocket = true) => {
            const deleteFileFromDirectory = (directory) => {
                if (directory.type === "directory" && directory.children) {
                    const updatedChildren = directory.children
                        .map((child) => {
                            if (child.type === "directory") {
                                return deleteFileFromDirectory(child);
                            }
                            if (child.id !== fileId) {
                                return child;
                            }
                            return null;
                        })
                        .filter((child) => child !== null);

                    return {
                        ...directory,
                        children: updatedChildren,
                    };
                } else {
                    return directory;
                }
            };

            setFileStructure((prevFileStructure) =>
                deleteFileFromDirectory(prevFileStructure)
            );

            if (openFiles.some((file) => file.id === fileId)) {
                setOpenFiles((prevOpenFiles) =>
                    prevOpenFiles.filter((file) => file.id !== fileId)
                );
            }

            if (activeFile?.id === fileId) {
                setActiveFile(null);
            }

            toast.success("File deleted successfully");

            if (!sendToSocket) return;
            socket.emit(SocketEvent.FILE_DELETED, { fileId });
        },
        [activeFile?.id, openFiles, socket]
    );

    const downloadFilesAndFolders = () => {
        const zip = new JSZip();

        const downloadRecursive = (item, parentPath = "") => {
            const currentPath =
                parentPath + item.name + (item.type === "directory" ? "/" : "");
            if (item.type === "file") {
                zip.file(currentPath, item.content);
            } else if (item.type === "directory" && item.children) {
                item.children.forEach((child) =>
                    downloadRecursive(child, currentPath)
                );
            }
        };

        if (fileStructure) {
            downloadRecursive(fileStructure);
            zip.generateAsync({ type: "blob" }).then((content) => {
                saveAs(content, "files_and_folders.zip");
            });
        }
    };

    return (
        <FileContext.Provider
            value={{
                fileStructure,
                openFiles,
                activeFile,
                users,
                drawingData,
                updateDirectory,
                createFile,
                renameDirectory,
                deleteDirectory,
                renameFile,
                deleteFile,
                updateFileContent,
                openFile,
                closeFile,
                downloadFilesAndFolders,
                setDrawingData,
            }}
        >
            {children}
        </FileContext.Provider>
    );
};

export default FileProvider;



