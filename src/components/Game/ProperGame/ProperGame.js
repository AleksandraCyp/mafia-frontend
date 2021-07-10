import React, { useState } from "react";

import Notifications from "./Notifications/Notifications";
import Players from "./Players/Players";
import Information from "./Information/Information";
import Orders from "./Orders/Orders";
import Chat from "./Chat/Chat";
import GameOver from "./GameOver/GameOver";

import "./ProperGame.css";

const ProperGame = ({
  socket,
  user,
  gameManager,
  isWaitingForRes,
  setIsWaitingForRes,
}) => {
  const player =
    gameManager.players.find((player) => player.id === user.id) || {};
  const nightStyle = { backgroundColor: "#181818", color: "white" };
  const dayStyle = { backgroundColor: "white", color: "black" };
  const [amorekChoices, setAmorekChoices] = useState([]);

  return (
    <div
      style={gameManager.phase === "night" ? nightStyle : dayStyle}
      className="pure-g gameContainer"
    >
      {gameManager.isGameOver ? (
        <GameOver gameManager={gameManager} player={user} />
      ) : (
        <div className="pure-u-1-2">
          <div className="leftSideGame">
            <Orders
              gameManager={gameManager}
              player={player}
              amorekChoices={amorekChoices}
              setAmorekChoices={setAmorekChoices}
              socket={socket}
              isWaitingForRes={isWaitingForRes}
              setIsWaitingForRes={setIsWaitingForRes}
            />
            <Players
              gameManager={gameManager}
              player={player}
              socket={socket}
              amorekChoices={amorekChoices}
              setAmorekChoices={setAmorekChoices}
              isWaitingForRes={isWaitingForRes}
              setIsWaitingForRes={setIsWaitingForRes}
            />
          </div>
        </div>
      )}
      <div className="pure-u-1-2">
        <div className="rightSideGame">
          <Notifications gameManager={gameManager} player={player} />
          <Chat gameManager={gameManager} player={player} socket={socket} />
          <Information gameManager={gameManager} player={player} />
        </div>
      </div>
    </div>
  );
};

export default ProperGame;
