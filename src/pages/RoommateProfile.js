import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase"; // Firestore Import
import { doc, getDoc } from "firebase/firestore";

const RoommateProfile = () => {
  const { id } = useParams(); // Get Roommate ID from URL
  const [roommate, setRoommate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoommate = async () => {
      try {
        const docRef = doc(db, "roommates", id); // Get document reference
        const docSnap = await getDoc(docRef); // Fetch document

        if (docSnap.exists()) {
          setRoommate(docSnap.data()); // Store roommate data
        } else {
          console.log("No roommate found!");
        }
      } catch (error) {
        console.error("Error fetching roommate:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoommate();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!roommate) return <p>Roommate not found!</p>;

  return (
    <div className="profile-container">
      <h2>{roommate.name}'s Profile</h2>
      <p>
        <strong>City:</strong> {roommate.city}
      </p>
      <p>
        <strong>Budget:</strong> ₹{roommate.budget}/month
      </p>
      <p>
  <strong>Interests:</strong>{" "}
  {Array.isArray(roommate.interests)
    ? roommate.interests.join(", ")
    : roommate.interests || "N/A"}
</p>

      <p>
        <strong>Pet-Friendly:</strong> {roommate.petFriendly ? "Yes" : "No"}
      </p>
      <p>
        <strong>Smoking:</strong> {roommate.smoking || "N/A"}
      </p>
      <p>
        <strong>Schedule:</strong> {roommate.schedule || "N/A"}
      </p>
      <p>
        <strong>Food Preference:</strong> {roommate.foodPreference || "N/A"}
      </p>
      <p>
        <strong>Language:</strong> {roommate.language || "N/A"}
      </p>
    </div>
  );
};

export default RoommateProfile;
