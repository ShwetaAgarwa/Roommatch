import React from "react";
import "../components/styles.css";

const AboutPage = () => {
  return (
    <div className="container">
      <h2>About RoomMatch</h2>
      <p>
        RoomMatch is a platform designed to help you find the perfect roommate. 
        Whether you're moving to a new city or just looking for someone to share rent, 
        we make the process easy and stress-free.
      </p>

      <h3>Our Mission</h3>
      <p>
      We aim to simplify the roommate-finding process by offering smart filters, verified profiles, and seamless communication between users.
           </p>

      <h3>Why Choose Us?</h3>
      <ul>
        <li>Budget-friendly matching</li>
          <li>Create a profile with your preferences</li>
          <li>Search for potential roommates</li>
          <li>Connect and chat before making a decision</li>

      </ul>
    </div>
  );
};

export default AboutPage;
