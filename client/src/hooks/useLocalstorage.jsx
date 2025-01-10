function useLocalStorage(namespace = "") {
    const setItem = (key: string, value: any) => {
        try {
            const namespacedKey = `${namespace}${key}`;
            const stringValue =
                typeof value === "string" ? value : JSON.stringify(value);
            localStorage.setItem(namespacedKey, stringValue);
        } catch (error) {
            console.error("Error setting localStorage item:", error);
        }
    };

    const getItem = (key: string): any => {
        try {
            const namespacedKey = `${namespace}${key}`;
            const value = localStorage.getItem(namespacedKey);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error("Error parsing localStorage item:", error);
            return null;
        }
    };

    const removeItem = (key: string) => {
        try {
            const namespacedKey = `${namespace}${key}`;
            localStorage.removeItem(namespacedKey);
        } catch (error) {
            console.error("Error removing localStorage item:", error);
        }
    };

    const clear = () => {
        try {
            Object.keys(localStorage)
                .filter((key) => key.startsWith(namespace))
                .forEach((key) => localStorage.removeItem(key));
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    };

    return { setItem, getItem, removeItem, clear };
}

export default useLocalStorage;
