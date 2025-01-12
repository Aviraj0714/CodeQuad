// Import React and ReactDOM for rendering
import ReactDOM from "react-dom/client";
import App from "./App"; // Omit the .tsx extension for JavaScript
import AppProvider from "../src/context/appProvider"; // Omit the .tsx extension for JavaScript
import "../src/styles/global.css";

// Create the root element and render the app
ReactDOM.createRoot(document.getElementById("root")).render(
    <AppProvider>
        <App />
    </AppProvider>
);
