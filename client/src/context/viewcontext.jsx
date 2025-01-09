import ChatsView from "@/components/sidebar/sidebar-views/ChatsView"
import FilesView from "@/components/sidebar/sidebar-views/FilesView"
import RunView from "@/components/sidebar/sidebar-views/RunView"
import SettingsView from "@/components/sidebar/sidebar-views/SettingsView"
import UsersView from "@/components/sidebar/sidebar-views/UsersView"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { ReactNode, createContext, useContext, useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { LuFiles } from "react-icons/lu"
import { PiChats, PiPlay, PiUsers } from "react-icons/pi"

const ViewContext = createContext(null)

export const useViews = () => {
    const context = useContext(ViewContext)
    if (!context) {
        throw new Error("useViews must be used within a ViewContextProvider")
    }
    return context
}

function ViewContextProvider({ children }) {
    const { isMobile } = useWindowDimensions()
    const [activeView, setActiveView] = useState("FILES")
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile)
    const [viewComponents] = useState({
        "FILES": <FilesView />,
        "CLIENTS": <UsersView />,
        "SETTINGS": <SettingsView />,
        "CHATS": <ChatsView />,
        "RUN": <RunView />,
    })
    const [viewIcons] = useState({
        "FILES": <LuFiles size={28} />,
        "CLIENTS": <PiUsers size={30} />,
        "SETTINGS": <IoSettingsOutline size={28} />,
        "CHATS": <PiChats size={30} />,
        "RUN": <PiPlay size={28} />,
    })

    return (
        <ViewContext.Provider
            value={{
                activeView,
                setActiveView,
                isSidebarOpen,
                setIsSidebarOpen,
                viewComponents,
                viewIcons,
            }}
        >
            {children}
        </ViewContext.Provider>
    )
}

export { ViewContextProvider }
export default ViewContext
