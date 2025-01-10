/**
 * @enum {string}
 */
const VIEWS = {
    FILES: "FILES",
    CHATS: "CHATS",
    CLIENTS: "CLIENTS",
    RUN: "RUN",
    SETTINGS: "SETTINGS",
};

/**
 * @typedef {Object} ViewContext
 * @property {string} activeView - The currently active view.
 * @property {function(string): void} setActiveView - Function to set the active view.
 * @property {boolean} isSidebarOpen - Whether the sidebar is open.
 * @property {function(boolean): void} setIsSidebarOpen - Function to set the sidebar open state.
 * @property {Object.<string, JSX.Element>} viewComponents - Components associated with each view.
 * @property {Object.<string, JSX.Element>} viewIcons - Icons associated with each view.
 */

export { VIEWS };
