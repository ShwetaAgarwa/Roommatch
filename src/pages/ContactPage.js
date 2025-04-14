import React, { useState } from "react";
import "../assets/styles/contact.css";

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({
    support: [],
    user1: [],
    user2: [],
  });
  const [input, setInput] = useState("");

  const users = [
    { id: "support", name: "Support" },
    { id: "user1", name: "Vikram" },
    { id: "user2", name: "Jane" },
  ];

  const sendMessage = () => {
    if (input.trim() && selectedChat) {
      const newMessage = {
        text: input,
        sender: "You",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => ({
        ...prev,
        [selectedChat]: [...prev[selectedChat], newMessage],
      }));

      setInput("");
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact & Messages</h2>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "messages" ? "active" : ""}
          onClick={() => setActiveTab("messages")}
        >
          Messages
        </button>
        <button
          className={activeTab === "support" ? "active" : ""}
          onClick={() => {
            setActiveTab("support");
            setSelectedChat("support");
          }}
        >
          Support Chat
        </button>
        <button
          className={activeTab === "contact" ? "active" : ""}
          onClick={() => setActiveTab("contact")}
        >
          Contact Form
        </button>
      </div>

      {/* Content */}
      <div className="content">
        {activeTab === "messages" && (
          <div className="chat-section">
            <div className="sidebar">
              <h3>Chats</h3>
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`chat-user ${selectedChat === user.id ? "selected" : ""}`}
                  onClick={() => setSelectedChat(user.id)}
                >
                  {user.name}
                </div>
              ))}
            </div>

            <div className="chat-window">
              {selectedChat ? (
                <>
                  <h3>Chat with {users.find((u) => u.id === selectedChat)?.name}</h3>
                  <div className="chat-box">
                    {messages[selectedChat].map((msg, index) => (
                      <div key={index} className={`chat-message ${msg.sender === "You" ? "sent" : "received"}`}>
                        <p className="message-text">{msg.text}</p>
                        <span className="timestamp">{msg.timestamp}</span>
                      </div>
                    ))}
                  </div>

                  <div className="chat-input-container">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                  </div>
                </>
              ) : (
                <p>Select a user to start chatting</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "support" && (
          <div className="support-chat">
            <h3>Live Support Chat</h3>
            <p>Chat with our support team for assistance.</p>
            <div className="chat-box">
              {messages.support.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender === "You" ? "sent" : "received"}`}>
                  <p className="message-text">{msg.text}</p>
                  <span className="timestamp">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            <div className="chat-input-container">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="contact-form">
            <h3>Contact Us</h3>
            <p>Have questions or need support? Send us a message.</p>

            <form>
              <label>Name:</label>
              <input type="text" placeholder="Your Name" required />

              <label>Email:</label>
              <input type="email" placeholder="Your Email" required />

              <label>Message:</label>
              <textarea placeholder="Your Message" rows="5" required></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
