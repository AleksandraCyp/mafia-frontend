import "./GameOver.css"

const GameOver = ({ gameManager, player }) => {
  const listPlayers = gameManager.players.map((item) => {
    return (
      <li key={item.id}>
        <p>
          {item.id === player.id ? "Ty" : `${item.name}`}: {item.character.name}{" "}
          ({item.fraction})
        </p>
        {item.image && (
          <img
            src={item.image}
            alt="User image"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
        )}
      </li>
    );
  });
  return (
    <div className="pure-u-1-2">
      <div className="gameOverContainer">
      <h1>Koniec gry</h1>
      <h2>Wygrała frakcja <span style={{textDecoration: "underline"}}>{gameManager.winningFraction}</span></h2>
      <ul>{listPlayers}</ul>
      </div>
    </div>
  );
};

export default GameOver;
