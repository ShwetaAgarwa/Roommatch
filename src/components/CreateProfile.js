import React, { useState } from "react";
import { db, auth } from "../firebase"; // ✅ Import auth
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    city: "",
    budget: "",
    interests: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to create a profile.");
        return;
      }

      const profileToSave = {
        ...profile,
        interests: profile.interests.split(",").map((i) => i.trim()),
        userId: user.uid, // ✅ Required for Firestore rules
      };

      await addDoc(collection(db, "roommates"), profileToSave);
      alert("Profile created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding profile:", error);
      alert("Failed to create profile.");
    }
  };

  return (
    <div className="container">
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={profile.name} onChange={handleChange} required />

        <label>Age:</label>
        <input name="age" value={profile.age} onChange={handleChange} required />

        <label>Gender:</label>
        <input name="gender" value={profile.gender} onChange={handleChange} required />

        <label>City:</label>
        <input name="city" value={profile.city} onChange={handleChange} required />

        <label>Budget:</label>
        <input name="budget" value={profile.budget} onChange={handleChange} required />

        <label>Interests (comma separated):</label>
        <input name="interests" value={profile.interests} onChange={handleChange} />

        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;
