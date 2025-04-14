import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/search.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="search-container">
      <h2>My Favorite Roommates ❤️</h2>

      <div className="roommate-list">
        {favorites.length > 0 ? (
          favorites.map((r) => (
            <div key={r.id} className="roommate-card">
              <h3>{r.name}</h3>
              <p><strong>City:</strong> {r.city}</p>
              <p><strong>Budget:</strong> ₹{r.budget}/month</p>

              <Link to={`/roommate/${r.id}`} className="view-profile-btn">
                View Profile
              </Link>
            </div>
          ))
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
