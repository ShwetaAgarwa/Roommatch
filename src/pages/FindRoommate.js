import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase"; // Firestore Database
import { collection, getDocs } from "firebase/firestore";
import "../assets/styles/search.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const FindRoommate = () => {
  const [roommates, setRoommates] = useState([]);
  const [filteredRoommates, setFilteredRoommates] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    age: "",
    gender: "",
    occupation: "",
    city: "",
    budget: "",
    petFriendly: false,
    smoking: "",
  });

  // 🔹 Fetch roommates from Firestore
  useEffect(() => {
    const fetchRoommates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "roommates"));
        const roommateData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoommates(roommateData);
        setFilteredRoommates(roommateData);
      } catch (error) {
        console.error("Error fetching roommates:", error);
      }
    };

    fetchRoommates();

    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // 🔹 Toggle favorite
  const toggleFavorite = (roommate) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === roommate.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== roommate.id);
    } else {
      updatedFavorites = [...favorites, roommate];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // 🔹 Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 Apply filters
  const handleSearch = () => {
    const results = roommates.filter((r) => {
      return (
        (!filters.age || r.age === parseInt(filters.age)) &&
        (!filters.gender || (r.gender && r.gender.trim().toLowerCase() === filters.gender.toLowerCase()))
 &&
        (!filters.occupation ||
          r.occupation
            .toLowerCase()
            .includes(filters.occupation.toLowerCase())) &&
        (!filters.city ||
          r.city.toLowerCase() === filters.city.toLowerCase()) &&
        (!filters.budget || r.budget <= parseInt(filters.budget)) &&
        (!filters.petFriendly || r.petFriendly === filters.petFriendly) &&
        (!filters.smoking || r.smoking === filters.smoking)
      );
    });

    setFilteredRoommates(results);
  };

  // 🔹 Clear filters
  const clearFilters = () => {
    setFilters({
      age: "",
      gender: "",
      occupation: "",
      city: "",
      budget: "",
      petFriendly: false,
      smoking: "",
    });
    setFilteredRoommates(roommates);
  };

  return (
    <div className="search-container">
      <h2>Find Your Perfect Roommate</h2>

      {/* Filters Section */}
      <div className="filters">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={filters.age}
          onChange={handleFilterChange}
        />

        <label>Gender:</label>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Occupation:</label>
        <input
          type="text"
          name="occupation"
          value={filters.occupation}
          onChange={handleFilterChange}
        />

        <label>City:</label>
        <select name="city" value={filters.city} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Pune">Pune</option>
        </select>

        <label>Max Budget (₹):</label>
        <input
          type="number"
          name="budget"
          value={filters.budget}
          onChange={handleFilterChange}
        />

        <label>Pet-Friendly:</label>
        <input
          type="checkbox"
          name="petFriendly"
          checked={filters.petFriendly}
          onChange={handleFilterChange}
        />

        <label>Smoking:</label>
        <select
          name="smoking"
          value={filters.smoking}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Smoker">Smoker</option>
          <option value="Non-smoker">Non-smoker</option>
        </select>

        <div className="button-group">
          <button onClick={handleSearch}>Search</button>
          <button className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Roommate Results Section */}
      <div className="roommate-list">
        {filteredRoommates.length > 0 ? (
          filteredRoommates.map((r) => (
            <div key={r.id} className="roommate-card">
              <h3>{r.name}</h3>
              <p>
                <strong>City:</strong> {r.city}
              </p>
              <p>
                <strong>Budget:</strong> ₹{r.budget}/month
              </p>
              <button onClick={() => toggleFavorite(r)}>
                {favorites.some((fav) => fav.id === r.id)
                  ? "❤️ Unfavorite"
                  : "🤍 Favorite"}
              </button>
              <Link to={`/roommate/${r.id}`} className="view-profile-btn">
                View Profile
              </Link>
            </div>
          ))
        ) : (
          <p>No roommates found.</p>
        )}
      </div>
    </div>
  );
};

export default FindRoommate;
