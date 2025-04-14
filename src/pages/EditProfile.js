import React, { useState, useEffect } from "react";
import "../assets/styles/profile.css";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const EditProfile = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    occupation: "",
    city: "Mumbai",
    budget: "",
    interests: "",
    petFriendly: false,
    smoking: "Non-smoker",
    schedule: "Night Owl",
    foodPreference: "Vegetarian",
    language: "Hindi",
    workFromHome: false,
    profilePic: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const docRef = doc(db, "roommates", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ ...docSnap.data() });
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePic: null,
    }));
  };

  const handleSave = async () => {
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    try {
      await setDoc(doc(db, "roommates", userId), {
        ...profile,
        userId: userId,
        interests: profile.interests.split(",").map((i) => i.trim()),
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>Edit Your Profile</h2>

      {/* Profile Picture */}
      <div className="profile-pic-container">
        {profile.profilePic ? (
          <>
            <img src={profile.profilePic} alt="Profile" className="profile-pic" />
            <button type="button" className="remove-img-btn" onClick={handleRemoveImage}>
              Remove Image
            </button>
          </>
        ) : (
          <div className="placeholder-pic">No Image</div>
        )}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <label>Name:</label>
      <input type="text" name="name" value={profile.name} onChange={handleChange} />

      <label>Age:</label>
      <input type="number" name="age" value={profile.age} onChange={handleChange} />

      <label>Gender:</label>
      <select name="gender" value={profile.gender} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label>Occupation:</label>
      <input type="text" name="occupation" value={profile.occupation} onChange={handleChange} />

      <label>City:</label>
      <select name="city" value={profile.city} onChange={handleChange}>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Pune">Pune</option>
        <option value="Chennai">Chennai</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>

      <label>Budget (₹ per month):</label>
      <input type="number" name="budget" value={profile.budget} onChange={handleChange} />

      <label>Interests (comma separated):</label>
      <input type="text" name="interests" value={profile.interests} onChange={handleChange} />

      <label>Pet-Friendly:</label>
      <input type="checkbox" name="petFriendly" checked={profile.petFriendly} onChange={handleChange} />

      <label>Smoking:</label>
      <select name="smoking" value={profile.smoking} onChange={handleChange}>
        <option value="Smoker">Smoker</option>
        <option value="Non-smoker">Non-smoker</option>
      </select>

      <label>Schedule:</label>
      <select name="schedule" value={profile.schedule} onChange={handleChange}>
        <option value="Night Owl">Night Owl</option>
        <option value="Early Bird">Early Bird</option>
      </select>

      <label>Food Preference:</label>
      <select name="foodPreference" value={profile.foodPreference} onChange={handleChange}>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Non-Vegetarian">Non-Vegetarian</option>
        <option value="Eggetarian">Eggetarian</option>
      </select>

      <label>Language:</label>
      <select name="language" value={profile.language} onChange={handleChange}>
        <option value="Hindi">Hindi</option>
        <option value="English">English</option>
        <option value="Marathi">Marathi</option>
        <option value="Telugu">Telugu</option>
        <option value="Bengali">Bengali</option>
        <option value="Tamil">Tamil</option>
      </select>

      <label>Work From Home Friendly:</label>
      <input type="checkbox" name="workFromHome" checked={profile.workFromHome} onChange={handleChange} />

      <button type="button" onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditProfile;
