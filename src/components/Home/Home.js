import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Home.css";

const Home = ({ socket, setIsGameOn, isGameOn, prevUser, setPrevUser }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  let history = useHistory();

  useEffect(() => {
    if (isGameOn) {
      socket.emit("turnHomePage", prevUser);
      setPrevUser("");
    }
  }, []);

  const handleChangeName = (e) => setName(e.target.value);

  const handleChangeRoom = (e) => setRoom(e.target.value);

  const handleChangeImage = (e) => {
    const img = e.target.files[0];
    if (e.target.files && img) {
      setImage(URL.createObjectURL(img));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !room) {
      return setMessage("Podaj nazwę użytkownika i nazwę pokoju");
    }
    socket.emit("getUsersInRoom", room, (res) => {
      if (res.some((player) => player.name === name)) {
        return setMessage(
          "Nazwa użytkownika zajęta: podaj inną nazwę użytkownika"
        );
      } else {
        socket.emit("getManager", room, (res) => {
          if (!res) {
            setIsGameOn(true);
            history.push("/game", { name, room, image });
            setMessage("Ładowanie...");
            setName("");
            setRoom("");
            setImage(undefined);
            return;
          } else {
            setMessage("W pokoju trwa gra: wybierz inną nazwę pokoju");
          }
        });
      }
    });
  };

  return (
    <div className="homeContainer">
      <h1>Witaj w Mafia Online!</h1>
      <form onSubmit={handleSubmit} className="pure-form pure-form-stacked">
        <fieldset>
          <label for="nameInput">Nazwa użytkownika:</label>
          <input type="text" id="nameInput" onChange={handleChangeName}></input>
          <label for="roomInput">Nazwa pokoju:</label>
          <input type="text" onChange={handleChangeRoom} id="roomInput"></input>
            <div className={image ? "pure-g imageLabel" : "imageLabel"}>
             <label for="imageInput" className={image && "pure-u-2-3"}>
              Awatar (opcjonalnie): 📁
            </label>  
            {image && (
              <img
                className="pure-u-1-3 imagePlayer"
                alt="User image"
                src={image}
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
            )}
          </div>
           <input
              type="file"
              size="20"
              id="imageInput"
              onChange={handleChangeImage}
            />
          <input
            type="submit"
            value="OK"
            className="pure-button"
          ></input>
          {message && <p className="pure-form-message">{message}</p>}
        </fieldset>
      </form>
    </div>
  );
};

export default Home;
