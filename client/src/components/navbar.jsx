import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">
                    Code Sync
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
