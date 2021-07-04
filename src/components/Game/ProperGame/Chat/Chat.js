import { useState } from "react";
import "./Chat.css";

const Chat = ({ gameManager, player }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(newMessage);
    setNewMessage("");
  };
  return (
    <div className="container chatContainer pure-form">
      <div className="chat">
        <ul>
          <li>Tutaj kiedyś będzie chat</li>
        </ul>
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          onChange={handleNewMessage}
          value={newMessage}
        ></input>
        <input type="submit" value="➣" className="pure-button"></input>
      </form>
    </div>
  );
};

export default Chat;
