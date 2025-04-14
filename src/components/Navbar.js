import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="logo">RoomMatch</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/profile">My Profile</Link></li>
        <Link to="/find-roommate">Find Roommate</Link>
  
      </ul>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
