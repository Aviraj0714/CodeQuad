import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GitHubCorner from "./components/githubCorner";
import Toast from "./components/toast/Toast";
import EditorPage from "./pages/editorpage";
import HomePage from "./pages/home";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor/:roomId" element={<EditorPage />} />
                </Routes>
            </Router>
            <Toast /> {/* Toast component from react-hot-toast */}
            <GitHubCorner />
        </>
    );
};

export default App;
