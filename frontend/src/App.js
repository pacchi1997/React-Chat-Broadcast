import "./App.css";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io("http://localhost:5000");
const userid = nanoid(3);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
   if(message.trim().length !== 0){
    socket.emit("chat", { message, userid });
   }
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
     
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty app</h1>

        {chat.map((payload, index) => {
          return (
            <p key={index}>
              {payload.message} <span >id: {payload.userid}</span>
            </p>
          );
        })}
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send secure message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
