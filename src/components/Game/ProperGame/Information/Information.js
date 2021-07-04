import "./Information.css";

const Information = ({ gameManager, player }) => {
  const charactersList = gameManager.characters.map((character, index) => (
    <li key={index}>{character}</li>
  ));

  return (
    <div className="container informationContainer">
      <h2>Informacje</h2>
      <div className="informationList">
      <div>
          <h3>Mój nick</h3>
          <p>{player.name}</p>
        </div>
        <div>
          <h3>Moja postać</h3>
          <p>{player.character.name}</p>
        </div>
        <div>
          <h3>Moja frakcja</h3>
          <p>{player.fraction}</p>
        </div>
        <div>
          <h3>Pokój</h3>
          <p>{player.room}</p>
        </div>
        <div>
          <h3>Doba i faza</h3>
          <p>
            {gameManager.phase === "day" ? "Dzień" : "Noc"} nr{" "}
            {gameManager.currentDay}
          </p>
        </div>
        <div>
          {" "}
          <h3>Wszystkie postaci</h3>
          <ul>{charactersList}</ul>
        </div>
      </div>
    </div>
  );
};

export default Information;
