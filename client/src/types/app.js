import { StoreSnapshot, TLRecord } from "@tldraw/tldraw";
import { RemoteUser, User, USER_STATUS } from "./user";

const ACTIVITY_STATE = {
    CODING: "coding",
    DRAWING: "drawing",
};

const AppContext = {
    users: [],
    setUsers: (users) => {
        if (typeof users === 'function') {
            return users(AppContext.users);
        }
        AppContext.users = users;
    },
    currentUser: null,
    setCurrentUser: (user) => {
        AppContext.currentUser = user;
    },
    status: USER_STATUS,
    setStatus: (status) => {
        AppContext.status = status;
    },
    activityState: ACTIVITY_STATE.CODING,
    setActivityState: (state) => {
        AppContext.activityState = state;
    },
    drawingData: null,
    setDrawingData: (data) => {
        AppContext.drawingData = data;
    },
};

export { ACTIVITY_STATE };
export { AppContext };
