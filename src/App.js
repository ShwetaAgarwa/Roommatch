import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";
import EditProfile from "./pages/EditProfile";
import ChatPage from "./pages/ChatPage";
import FindRoommate from "./pages/FindRoommate";
import RoommateProfile from "./pages/RoommateProfile"; // Import RoommateProfile
import UserProfile from "./pages/UserProfile";
import CreateProfile from "./components/CreateProfile";

import "./assets/styles/global.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/find-roommate" element={<FindRoommate />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/roommate/:id" element={<RoommateProfile />} /> {/* New Route for Roommate Profile */}
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
