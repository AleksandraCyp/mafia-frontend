import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { io } from "socket.io-client";

import Home from "./components/Home/Home";
import Game from "./components/Game/Game";

import "./App.css";

function App() {
  const socket = io("https://mafia-socket-backend.herokuapp.com/");
  const [isGameOn, setIsGameOn] = useState(false);
  const [prevUser, setPrevUser] = useState("");

  return (
    <Router>
      <Route exact path="/">
        <Home
          socket={socket}
          setIsGameOn={setIsGameOn}
          isGameOn={isGameOn}
          prevUser={prevUser}
          setPrevUser={setPrevUser}
        />
      </Route>
      <Route exact path="/game">
        {isGameOn ? (
          <Game socket={socket} setPrevUser={setPrevUser} />
        ) : (
          <Redirect to="/" />
        )}
      </Route>
    </Router>
  );
}

export default App;
