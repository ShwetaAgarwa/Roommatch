import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/settings.css";

const SettingsPage = () => {
  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <p>Manage your preferences and profile settings here.</p>

      <div className="settings-option">
        <h2>Profile Settings</h2>
        <Link to="/edit-profile">
          <button>Edit Profile</button>
        </Link>
      </div>

      <div className="settings-option">
        <h2>Account Settings</h2>
        <button>Change Password</button>
      </div>

      <div className="settings-option">
        <h2>Privacy</h2>
        <button>Manage Privacy Settings</button>
      </div>
    </div>
  );
};

export default SettingsPage;
