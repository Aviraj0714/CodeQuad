import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error(
            "useAppContext must be used within an AppContextProvider"
        );
    }
    return context;
};

function AppContextProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState("INITIAL"); // Replace USER_STATUS.INITIAL with the default string value
    const [currentUser, setCurrentUser] = useState({
        username: "",
        roomId: "",
    });
    const [activityState, setActivityState] = useState("CODING"); // Replace ACTIVITY_STATE.CODING with the default string value
    const [drawingData, setDrawingData] = useState(null);

    return (
        <AppContext.Provider
            value={{
                users,
                setUsers,
                currentUser,
                setCurrentUser,
                status,
                setStatus,
                activityState,
                setActivityState,
                drawingData,
                setDrawingData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export { AppContextProvider };
export default AppContext;
