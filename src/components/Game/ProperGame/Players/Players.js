import React, { useState } from "react";

import "./Players.css";

const Players = ({
  gameManager,
  player,
  socket,
  amorekChoices,
  setAmorekChoices,
}) => {
  const [highlightedCharacter, setHighlightedCharacter] = useState([]);

  const handleHighlightCharacter = (item) => {
    setHighlightedCharacter(item);
  };

  const handleStopHighlightCharacter = () => {
    setHighlightedCharacter(undefined);
  };

  const handlePLO = (chosenPlayer) => {
    socket.emit("PLOCheck", chosenPlayer);
  };

  const handleAmorek = (chosenPlayer) => {
    if (amorekChoices.find((choice) => choice.id === chosenPlayer.id)) {
      return setAmorekChoices(
        amorekChoices.filter((choice) => choice.id !== chosenPlayer.id)
      );
    } else {
      if (amorekChoices.length < 2) {
        const newAmorekChoices = [...amorekChoices, chosenPlayer];
        return setAmorekChoices(newAmorekChoices);
      }
    }
  };

  const handleWariat = (item) => {
    socket.emit("wariatKill", item);
  };

  const handleEndDayVoting = (type, offerer, offer) => {
    socket.emit("endDayVotingOffer", type, offerer, offer);
  };

  const handleSecondOffer = (type, offer) => {
    socket.emit("endDaySecondOffer", type, player, offer);
  };

  const handleOfferDuel = (offer) => {
    socket.emit("offerDuel", offer, player);
  };

  const handleSuggestShot = (chosenPlayer) => {
    socket.emit("suggestShot", chosenPlayer, player);
  };

  const handleShoot = (chosenPlayer) => {
    socket.emit("shoot", chosenPlayer, player);
  };

  const handleHeal = (chosenPlayer) => {
    socket.emit("heal", chosenPlayer, player);
  };

  const handleCattaniCheck = (chosenPlayer) => {
    socket.emit("cattaniCheck", chosenPlayer, player);
  };

  const handleMścicielTurnOffFunction = (chosenPlayer) => {
    socket.emit("mścicielTurnOffFunction", chosenPlayer, player);
  };

  const playersList = gameManager.players.map((item) => (
    <li
      key={item.id}
      style={item.isAlive ? null : { color: "lightGray" }}
      onMouseOver={() => handleHighlightCharacter(item.name)}
      onMouseOut={handleStopHighlightCharacter}
    >
      <div className="usersListImage userMenuTop">
        {!item.image && <div className="emptyImage"></div>}
        {item.image && (
          <img
            src={item.image}
            alt="User"
            className="imagePlayer"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
        )}
        <p
          style={
            item.id === player.id
              ? { fontWeight: "bold", textDecoration: "underline" }
              : null
          }
        >
          {item.id === player.id ? `Ja (${item.character.name})` : item.name}{" "}
          {player.fraction === "Mafia" &&
            item.fraction === "Mafia" &&
            item.id !== player.id &&
            `(${item.character.name})`}
        </p>
      </div>
      {item.isAlive && gameManager.phase === "day" && player.isAlive && (
        <ul
          style={
            highlightedCharacter === item.name
              ? { display: "block" }
              : { display: "none" }
          }
          className="usersBottomMenu"
        >
          {player.id !== item.id &&
            !gameManager.duel.offeredBy &&
            !gameManager.duel.finished &&
            !gameManager.endDayVoting.offeredBy && (
              <li onClick={() => handleOfferDuel(item)}>Wyzwij na pojedynek</li>
            )}
          {!gameManager.endDayVoting.offeredBy &&
            !gameManager.duel.offeredBy && (
              <li onClick={() => handleEndDayVoting("check", player, item)}>
                Zaproponuj sprawdzenie
              </li>
            )}
          {!gameManager.endDayVoting.offeredBy &&
            !gameManager.duel.offeredBy && (
              <li onClick={() => handleEndDayVoting("kill", player, item)}>
                Zaproponuj zabicie
              </li>
            )}
          {gameManager.endDayVoting.accepted &&
            gameManager.endDayVoting.offers[0].id === player.id &&
            gameManager.endDayVoting.offers.length === 1 &&
            item.id !== player.id && (
              <li onClick={() => handleSecondOffer("check", item)}>
                Wybierz jako kontropropozycję - sprawdzenie
              </li>
            )}
          {gameManager.endDayVoting.accepted &&
            gameManager.endDayVoting.offers[0].id === player.id &&
            gameManager.endDayVoting.offers.length === 1 &&
            item.id !== player.id && (
              <li onClick={() => handleSecondOffer("kill", item)}>
                Wybierz jako kontropropozycję - zabicie
              </li>
            )}
          {player.character.name === "Wariat" &&
            player.id !== item.id &&
            !gameManager.endDayVoting.offeredBy &&
            !gameManager.hasWariatActed &&
            gameManager.mścicielChoice !== "Wariat" && (
              <li onClick={() => handleWariat(item)}>Zabij w szale</li>
            )}
        </ul>
      )}
      {item.isAlive && gameManager.phase === "night" && player.isAlive && (
        <ul
          style={
            highlightedCharacter === item.name
              ? { display: "block" }
              : { display: "none" }
          }
          className="usersBottomMenu"
        >
          {player.fraction === "Mafia" &&
            gameManager.currentDay !== 0 &&
            !gameManager.mafiaVoting.chosenPlayer && (
              <li onClick={() => handleSuggestShot(item)}>Zaproponuj strzał</li>
            )}
          {player.character.name === gameManager.mafiaLeader &&
            gameManager.currentDay !== 0 &&
            !gameManager.mafiaVoting.chosenPlayer && (
              <li onClick={() => handleShoot(item)}>Oddaj strzał</li>
            )}
          {player.character.name === "Lekarz" &&
            gameManager.currentDay !== 0 &&
            !gameManager.healedByLekarz &&
            item.id !== player.id &&
            gameManager.prevMścicielChoice !== "Lekarz" && (
              <li onClick={() => handleHeal(item)}>Ulecz</li>
            )}
          {player.character.name === "Lekarz" &&
            gameManager.currentDay !== 0 &&
            !gameManager.healedByLekarz &&
            item.id === player.id &&
            !gameManager.hasLekarzHealedHimself &&
            gameManager.prevMścicielChoice !== "Lekarz" && (
              <li onClick={() => handleHeal(item)}>Ulecz</li>
            )}
          {player.character.name === "Komisarz Cattani" &&
            player.id !== item.id &&
            gameManager.currentDay !== 0 &&
            !gameManager.hasCattaniActed &&
            gameManager.prevMścicielChoice !== "Komisarz Cattani" && (
              <li onClick={() => handleCattaniCheck(item)}>Sprawdź frakcję</li>
            )}
          {player.character.name === "PLO" &&
            player.id !== item.id &&
            gameManager.currentDay === 0 &&
            !gameManager.hasPLOActed && (
              <li onClick={() => handlePLO(item)}>Sprawdź postać</li>
            )}
          {player.character.name === "Mściciel" &&
            gameManager.currentDay !== 0 &&
            !gameManager.mścicielChoice &&
            gameManager.mafiaVoting.chosenPlayer &&
            item.character.name !== "Mściciel" &&
            item.character.name !== gameManager.prevMścicielChoice &&
            item.fraction !== "Mafia" && (
              <li onClick={() => handleMścicielTurnOffFunction(item)}>
                Wyłącz funkcję
              </li>
            )}
          {player.character.name === "Amorek" &&
            gameManager.currentDay === 0 &&
            !gameManager.hasAmorekActed && (
              <li>
                Połącz węzłami miłości{" "}
                <input
                  type="checkbox"
                  checked={
                    amorekChoices.find((choice) => choice.id === item.id)
                      ? true
                      : false
                  }
                  onChange={() => handleAmorek(item)}
                ></input>
              </li>
            )}
        </ul>
      )}
    </li>
  ));
  return (
    <div className="playersContainer">
      <ul>{playersList}</ul>
    </div>
  );
};

export default Players;
