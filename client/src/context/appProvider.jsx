import { AppContextProvider } from "./appContext.jsx";
import { ChatContextProvider } from "./chatContext.jsx";
import { FileContextProvider } from "./filecontext.jsx";
import { RunCodeContextProvider } from "./runcodeContext.jsx";
import { SettingContextProvider } from "./settingContext.jsx";
import { SocketProvider } from "./socketContext.jsx";
import { ViewContextProvider } from "./viewcontext.jsx";

function AppProvider({ children }) {
    return (
        <AppContextProvider>
            <SocketProvider>
                <SettingContextProvider>
                    <ViewContextProvider>
                        <FileContextProvider>
                            <RunCodeContextProvider>
                                <ChatContextProvider>
                                    {children}
                                </ChatContextProvider>
                            </RunCodeContextProvider>
                        </FileContextProvider>
                    </ViewContextProvider>
                </SettingContextProvider>
            </SocketProvider>
        </AppContextProvider>
    );
}

export default AppProvider;
