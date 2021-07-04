import React, { useState, useEffect } from "react";
import characterDescritptions from "./CharactersDescriptions";

import "./Settings.css";

const Settings = ({ users, socket, user, setGameManager }) => {
  const [characters, setCharacters] = useState([]);
  const [highlightedCharacter, setHighlightedCharacter] = useState([]);

  const mafiaCharacters = [
    "Kokietka",
    "Terrorysta",
    "Szybki z Mafii",
    "Mściciel",
  ];
  const cityCharacters = [
    "Szybki z Miasta",
    "PLO",
    "Komisarz Cattani",
    "Lekarz",
    "Sędzia",
    "Święty",
    "Wariat",
    "Amorek",
  ];

  useEffect(() => {
    socket.on("changeCharacters", (characters) => {
      setCharacters(characters);
    });
    socket.on("newGame", (gameManager) => {
      setGameManager(gameManager);
    });
  }, []);

  const handleCheckboxChange = (e) => {
    if (user.isAdmin)
      socket.emit("chooseCharacter", { name: e.target.name, user });
  };

  const handleStartGame = () => {
    socket.emit("startGame", { room: user.room, characters, users });
  };

  const handleHighlightCharacter = (item) => {
    setHighlightedCharacter(item);
  };

  const handleStopHighlightCharacter = () => {
    setHighlightedCharacter(undefined);
  };

  const userList = users.map((user) => (
    <li
      style={user.isAdmin ? { color: "red" } : { color: "black" }}
      key={user.id}
      className="usersListImage"
    >
      {user.image && (
        <img
          src={user.image}
          alt="User image"
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
          className="imagePlayer"
        />
      )}
      {!user.image && <div className="emptyImage"></div>}
      <p>{user.name}</p>
    </li>
  ));

  const isButtonDisabled = () => {
    const isNumberRight = users.length === characters.length;
    const isUserAdmin = user.isAdmin;
    const isThereMafia = characters.some((character) =>
      mafiaCharacters.includes(character.name)
    );
    const isThereMiasto = characters.some((character) =>
      cityCharacters.includes(character.name)
    );
    return !isNumberRight || !isUserAdmin || !isThereMiasto || !isThereMafia;
  };

  const renderDescription = (character) => {
    switch (character) {
      case "PLO":
        return characterDescritptions.PLO;
      case "Lekarz":
        return characterDescritptions.lekarz;
      case "Komisarz Cattani":
        return characterDescritptions.komisarzCattani;
      case "Święty":
        return characterDescritptions.święty;
      case "Szybki z Miasta":
        return characterDescritptions.szybkiZMiasta;
      case "Wariat":
        return characterDescritptions.wariat;
      case "Mściciel":
        return characterDescritptions.mściciel;
      case "Szybki z Mafii":
        return characterDescritptions.szybkiZMafii;
      case "Sędzia":
        return characterDescritptions.sędzia;
      case "Amorek":
        return characterDescritptions.amorek;
      case "Kokietka":
        return characterDescritptions.kokietka;
      case "Terrorysta":
        return characterDescritptions.terrorysta;
      default:
        return "";
    }
  };

  const listCharacters = (list) => {
    return list.map((listItem) => {
      return (
        <li
          key={listItem}
          className="characterItemContainer"
          onMouseOver={() => handleHighlightCharacter(listItem)}
          onMouseOut={handleStopHighlightCharacter}
        >
          <label
            htmlFor={listItem}
            className="characterItem"
            style={
              highlightedCharacter === listItem
                ? { backgroundColor: "whiteSmoke" }
                : { backgroundColor: "white" }
            }
          >
            {user.isAdmin && (
              <input
                type="checkbox"
                id={listItem}
                name={listItem}
                onChange={handleCheckboxChange}
                checked={characters.some(
                  (character) => character.name === listItem
                )}
              ></input>
            )}
            <span
              style={
                characters.some((character) => character.name === listItem)
                  ? { fontWeight: "bold" }
                  : null
              }
            >
              {listItem}
            </span>
          </label>
          <div
            className="characterItemDescription"
            style={
              highlightedCharacter === listItem
                ? { display: "block" }
                : { display: "none" }
            }
          >
            {renderDescription(listItem)}
          </div>
        </li>
      );
    });
  };

  return (
    <div className="pure-g settingsContainer">
      <h1 className="pure-u-1">Pokój {user.room}</h1>
      <div className="pure-u-1-2 ">
        <div className="settingsColumn settingsLeftColumn">
          <h1>Gracze</h1>
          <ul>{userList}</ul>
        </div>
      </div>
      <div className="pure-u-1-2 ">
        <div className="settingsColumn">
          <h1>Postaci</h1>
          <h2>Miasto</h2>
          <ul className="charactersList">{listCharacters(cityCharacters)}</ul>
          <h2>Mafia</h2>
          <ul className="charactersList">{listCharacters(mafiaCharacters)}</ul>
        </div>
      </div>
      <div className="pure-u-1">
        <input
          type="button"
          value="Rozpocznij grę"
          disabled={isButtonDisabled()}
          onClick={handleStartGame}
          className="pure-button myButton"
        ></input>
      </div>
    </div>
  );
};

export default Settings;
