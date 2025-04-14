import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore instance
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import "../assets/styles/chat.css"; // Ensure styles are updated

// Reference to Firestore messages collection
const messagesRef = collection(db, "messages");

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 🟢 Fetch messages in real-time from Firestore
  useEffect(() => {
    const q = query(messagesRef, orderBy("timestamp", "asc")); // Order by time
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // 🟢 Send message to Firestore
  const sendMessage = async () => {
    if (input.trim()) {
      try {
        await addDoc(messagesRef, {
          text: input,
          sender: "You", // Later, replace with logged-in user
          timestamp: serverTimestamp(), // Store exact time
        });

        setInput(""); // Clear input after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with Roommates</h2>

      {/* Chat Messages */}
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender === "You" ? "sent" : "received"}`}>
            <p className="message-text">{msg.text}</p>
            <span className="timestamp">
              {msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleTimeString() : "Sending..."}
            </span>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
