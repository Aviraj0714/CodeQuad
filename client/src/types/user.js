const USER_CONNECTION_STATUS = {
    OFFLINE: "offline",
    ONLINE: "online",
};

/**
 * @typedef {Object} User
 * @property {string} username
 * @property {string} roomId
 */

/**
 * @typedef {Object} RemoteUser
 * @property {string} username
 * @property {string} roomId
 * @property {USER_CONNECTION_STATUS} status
 * @property {number} cursorPosition
 * @property {boolean} typing
 * @property {string} currentFile
 * @property {string} socketId
 */

const USER_STATUS = {
    INITIAL: "initial",
    CONNECTING: "connecting",
    ATTEMPTING_JOIN: "attempting-join",
    JOINED: "joined",
    CONNECTION_FAILED: "connection-failed",
    DISCONNECTED: "disconnected",
};

export { USER_CONNECTION_STATUS, USER_STATUS };
