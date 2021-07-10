import { useState } from "react";
import "./Chat.css";

const Chat = ({ gameManager, player, socket }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("newMessage", newMessage, player);
    setNewMessage("");
  };

  const messagesList = () => {
    if (!gameManager.messages) return;
    return gameManager.messages.map((message, index) => {
      const isSenderYou = message.from === player.name;
      const sender = isSenderYou ? "Ty" : message.from;
      return (
        <li
          key={index}
          style={isSenderYou ? { textAlign: "right" } : { textAlign: "left" }}
        >
          <b>{sender}:</b>
          <span>{message.message}</span>
        </li>
      );
    });
  };
  return (
    <div className="container chatContainer pure-form">
      <ul className="chat">{messagesList()}</ul>
      {gameManager.phase === "day" && (
        <form onSubmit={sendMessage}>
          <input
            type="text"
            onChange={handleNewMessage}
            value={newMessage}
          ></input>
          <input type="submit" value="➣" className="pure-button"></input>
        </form>
      )}
    </div>
  );
};

export default Chat;
