import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/home.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="hero">
        <h1>Welcome to RoomMatch</h1>
        <p>Find your perfect roommate hassle-free.</p>
        <Link to="/register" className="cta-button">Get Started</Link>
      </header>

      <section className="features">
        <div className="feature-box">
          <h2>Search by Location</h2>
          <p>Find roommates in your preferred city.</p>
        </div>
        <div className="feature-box">
          <h2>Set Your Budget</h2>
          <p>Match with people based on your budget range.</p>
        </div>
        <div className="feature-box">
          <h2>Shared Interests</h2>
          <p>Get matched with roommates who share your hobbies.</p>
        </div>
      </section>

      <div className="find-roommate-btn">
        <Link to="/find-roommate" className="cta-button">Find a Roommate</Link>
      </div>

      <footer>
        <p>© 2025 RoomMatch. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
