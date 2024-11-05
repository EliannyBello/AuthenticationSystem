import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-logo">Auth System</h1>
            <div className="navbar-links">
                <Link to="/login">Login</Link>
                <Link to="/register">Sign Up</Link>
            </div>
        </nav>
    );
};

export default Navbar;
