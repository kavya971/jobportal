import { useState } from "react";
import axios from "axios";

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        const res = await axios.post("/api/chatbot", { message: input });
        setMessages([...messages, { user: input, bot: res.data.reply }]);
        setInput("");
    };

    return (
        <div>
            <div>
                {messages.map((msg, i) => (
                    <p key={i}><strong>You:</strong> {msg.user} <br/> <strong>Bot:</strong> {msg.bot}</p>
                ))}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chatbox;
