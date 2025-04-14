import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to edit page
import "../assets/styles/profile.css";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    setProfile(savedProfile);
  }, []);

  if (!profile) return <p>Profile not found!</p>;

  return (
    <div className="profile-container">
      <h2>{profile.name || "User"}'s Profile</h2>
      <p>
        <strong>Age:</strong> {profile.age || "N/A"}
      </p>
      <p>
        <strong>Gender:</strong> {profile.gender || "N/A"}
      </p>
      <p>
        <strong>Occupation:</strong> {profile.occupation || "N/A"}
      </p>
      <p>
        <strong>City:</strong> {profile.city || "N/A"}
      </p>
      <p>
        <strong>Budget:</strong> ₹{profile.budget || "N/A"}/month
      </p>
      <p>
        <strong>Interests:</strong> {profile.interests || "N/A"}
      </p>
      <p>
        <strong>Pet-Friendly:</strong> {profile.petFriendly ? "Yes" : "No"}
      </p>
      <p>
        <strong>Smoking:</strong> {profile.smoking || "N/A"}
      </p>
      <p>
        <strong>Schedule:</strong> {profile.schedule || "N/A"}
      </p>
      <p>
        <strong>Food Preference:</strong> {profile.foodPreference || "N/A"}
      </p>
      <p>
        <strong>Language:</strong> {profile.language || "N/A"}
      </p>

      {/* Navigate to Edit Profile Page */}
      <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
    </div>
  );
};

export default UserProfile;
