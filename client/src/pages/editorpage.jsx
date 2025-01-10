import SplitterComponent from "../components/splitterComponent";
import ConnectionStatusPage from "../components/connection/connectionstatusPage";
import Sidebar from "../components/sidebar/sidebar";
import WorkSpace from "../components/workspace/index";
import { useAppContext } from "../context/appContext";
import { useSocket } from "../context/socketContext";
import useFullScreen from "../hooks/useFullscreen";
import useUserActivity from "../hooks/useUserAvtivtiy";
import { SocketEvent } from "../types/socket.js";
import { USER_STATUS } from "../types/user.js";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditorPage() {
    // Listen user online/offline status
    useUserActivity();
    // Enable fullscreen mode
    useFullScreen();
    const navigate = useNavigate();
    const { roomId } = useParams();
    const { status, setCurrentUser, currentUser } = useAppContext();
    const { socket } = useSocket();
    const location = useLocation();

    useEffect(() => {
        if (currentUser.username.length > 0) return;
        const username = location.state?.username;
        if (username === undefined) {
            navigate("/", {
                state: { roomId },
            });
        } else if (roomId) {
            const user = { username, roomId }; // Removed type annotation
            setCurrentUser(user);
            socket.emit(SocketEvent.JOIN_REQUEST, user);
        }
    }, [
        currentUser.username,
        location.state?.username,
        navigate,
        roomId,
        setCurrentUser,
        socket,
    ]);

    if (status === USER_STATUS.CONNECTION_FAILED) {
        return <ConnectionStatusPage />;
    }

    return (
        <SplitterComponent>
            <Sidebar />
            <WorkSpace />
        </SplitterComponent>
    );
}

export default EditorPage;
