import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useLocation } from "react-router-dom";

import Settings from "./Settings/Settings";
import ProperGame from "./ProperGame/ProperGame";

const Game = ({ socket, setPrevUser }) => {
  const location = useLocation();
  const name = location.state.name;
  const room = location.state.room;
  const image = location.state.image;
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [gameManager, setGameManager] = useState({});

  useEffect(() => {
    socket.emit("join", { name, room, image }, (res) => {
      if (res) console.log(res);
    });
  }, [name, room]);

  useEffect(() => {
    socket.on("roomData", ({ users, manager }) => {
      const me = users.find((user) => user.name === name);
      setUsers(users);
      setUser(me);
      setGameManager(manager || {});
      setPrevUser(me);
    });
  }, []);

  return (
    <>
      {_.isEmpty(gameManager) ? (
        <Settings
          users={users}
          socket={socket}
          user={user}
          gameManager={gameManager}
          setGameManager={setGameManager}
        />
      ) : (
        <ProperGame
          socket={socket}
          user={user}
          gameManager={gameManager}
        />
      )}
    </>
  );
};

export default Game;
