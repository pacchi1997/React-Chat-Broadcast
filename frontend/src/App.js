import "./App.css";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";
import {HiAnnotation } from "react-icons/hi";
import { IoSend } from "react-icons/io5";


const socket = io("http://localhost:5000");
const PREFIX = "chatty";
const userid = PREFIX + nanoid(3);


const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const r = randomBetween(0, 255);
const g = randomBetween(0, 255);
const b = randomBetween(0, 255);
const rgb = `rgb(${r},${g},${b})`;


function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
   if(message.trim().length !== 0){
    socket.emit("chat", { message, userid ,rgb});
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
        <h1>Chit Chat  <HiAnnotation /></h1>

       

        <div className="chat">
        {chat.map((payload, index) => {
          return (
            <p key={index}>
              {payload.message} <span style={{  backgroundColor: `${payload.rgb}`}}>id: {payload.userid}</span>
            </p>
          );
        })}
        </div>
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send secure message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit"><IoSend /></button>
        </form>
      </header>
    </div>
  );
}

export default App;
