import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false); // Toggle chat visibility

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { text: input, user: "me" }];
    setMessages(newMessages);

    try {
      const response = await axios.post("http://localhost:4000/api/v1/chatbot/chat", {
        message: input,
      });

      setMessages([...newMessages, { text: response.data.reply, user: "bot" }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
    }

    setInput("");
  };

  return (
    <div>
      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onClick={() => setShowChat(!showChat)}
      >
        💬
      </button>

      {showChat && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            background: "white",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <h3>Chatbot</h3>
          <div style={{ height: "200px", overflowY: "scroll", borderBottom: "1px solid gray" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.user === "me" ? "right" : "left" }}>
                <p
                  style={{
                    background: msg.user === "me" ? "#007bff" : "#f1f1f1",
                    color: msg.user === "me" ? "white" : "black",
                    padding: "5px",
                    borderRadius: "5px",
                    display: "inline-block",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "80%", padding: "5px", marginTop: "5px" }}
          />
          <button onClick={sendMessage} style={{ width: "18%", padding: "5px" }}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
