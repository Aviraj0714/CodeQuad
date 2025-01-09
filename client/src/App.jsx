import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import EditorPage from './pages/editorpage';
import Navbar from './components/navbar';
import Footer from './components/common/footer';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor/:id" element={<EditorPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
