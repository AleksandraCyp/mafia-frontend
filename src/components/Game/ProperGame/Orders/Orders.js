import "./Orders.css";

const Loader = () => {
  return <div>Loading...</div>;
};

const Orders = ({
  gameManager,
  player,
  amorekChoices,
  setAmorekChoices,
  socket,
}) => {
  const submitAmoreChoices = () => {
    if (amorekChoices.length === 2) {
      socket.emit("amorekBind", amorekChoices, player);
      setAmorekChoices([]);
    }
  };

  const handleAcceptOffer = (decision) => {
    socket.emit("decisionEndDayOffer", player, decision);
  };

  const handleEndDayVote = (player, vote, type) => {
    socket.emit("voteEndOfDay", player, vote, type);
  };

  const handleSędziaDecision = (decision) => {
    socket.emit("sędziaDecision", decision, player);
  };

  const handleDuelVote = (vote) => {
    socket.emit("duelVote", player, vote);
  };

  const listMafiaVotes = () => {
    const aliveMafiaPlayers = gameManager.players.filter((item) => {
      return item.isAlive && item.fraction === "Mafia";
    });
    return aliveMafiaPlayers.map((mafiaPlayer) => {
      const decision = gameManager.mafiaVoting.votes.find(
        (vote) => vote[0].id === mafiaPlayer.id
      );
      return (
        <li key={mafiaPlayer.id}>
          {mafiaPlayer.id === player.id ? "Ty" : mafiaPlayer.name}:{" "}
          {decision ? decision[1].name : "brak"}
        </li>
      );
    });
  };

  return (
    <div className="container ordersContainer">
      <h2>Polecenia</h2>
      <div className="ordersList">
        {gameManager.phase === "night" &&
          player.fraction === "Mafia" &&
          gameManager.currentDay !== 0 &&
          player.isAlive &&
          player.character.name !== gameManager.mafiaLeader &&
          !gameManager.mafiaVoting.chosenPlayer && (
            <>
              <p>Zasugeruj, w kogo Mafia powinna oddać strzał</p>
              <p>Oddane głosy:</p>
              <ul>{listMafiaVotes()}</ul>
            </>
          )}
        {gameManager.phase === "night" &&
          player.character.name === gameManager.mafiaLeader &&
          gameManager.currentDay !== 0 &&
          player.isAlive &&
          !gameManager.mafiaVoting.chosenPlayer && (
            <>
              <p>Zasugeruj, w kogo Mafia powinna oddać strzał i oddaj strzał</p>
              <p>Oddane głosy:</p>
              <ul>{listMafiaVotes()}</ul>
            </>
          )}
        {gameManager.phase === "night" &&
          player.character.name === "Mściciel" &&
          gameManager.currentDay !== 0 &&
          !gameManager.mścicielChoice &&
          player.isAlive &&
          gameManager.mafiaVoting.chosenPlayer && (
            <p>Podejmij decyzję, kogo funkcję chcesz wyłączyć</p>
          )}
        {gameManager.phase === "night" &&
          player.character.name === "Komisarz Cattani" &&
          gameManager.currentDay !== 0 &&
          !gameManager.hasCattaniActed &&
          player.isAlive &&
          gameManager.prevMścicielChoice !== "Komisarz Cattani" && (
            <p>Podejmij decyzję, kogo frakcję chcesz sprawdzić</p>
          )}
        {gameManager.phase === "night" &&
          player.character.name === "Lekarz" &&
          gameManager.currentDay !== 0 &&
          !gameManager.healedByLekarz &&
          player.isAlive &&
          gameManager.prevMścicielChoice !== "Lekarz" && (
            <p>Podejmij decyzję, kogo chcesz uleczyć</p>
          )}
        {gameManager.phase === "night" &&
          player.character.name === "PLO" &&
          gameManager.currentDay === 0 &&
          !gameManager.hasPLOActed &&
          player.isAlive && (
            <p>Podejmij decyzję, postać którego gracza chcesz sprawdzić</p>
          )}
        {gameManager.phase === "night" &&
          player.character.name === "Amorek" &&
          gameManager.currentDay === 0 &&
          !gameManager.hasAmorekActed &&
          player.isAlive && (
            <>
              <p>
                Podejmij decyzję, których dwóch graczy chcesz połączyć więzami
                miłości
              </p>
              <div>
                <input
                  type="button"
                  value="Połącz"
                  onClick={submitAmoreChoices}
                  className="pure-button"
                  disabled={amorekChoices.length !== 2}
                ></input>
              </div>
            </>
          )}
        {gameManager.phase === "day" &&
          gameManager.endDayVoting.offeredBy &&
          gameManager.endDayVoting.offeredBy.id !== player.id &&
          player.isAlive &&
          !gameManager.endDayVoting.accepted &&
          !gameManager.endDayVoting.agreements.some(
            (vote) => vote[0].id === player.id
          ) && (
            <div>
              Czy wyrażasz zgodę, aby pierwszą propozycją na{" "}
              {gameManager.endDayVoting.type === "kill"
                ? "zabicie"
                : "sprawdzenie"}{" "}
              był następujący gracz:{" "}
              {gameManager.endDayVoting.offers[0].id === player.id
                ? "ty"
                : gameManager.endDayVoting.offers[0].name}
              ?
              <div>
                <input
                  type="button"
                  value="Tak"
                  className="pure-button"
                  onClick={() => handleAcceptOffer(true)}
                ></input>
                <input
                  type="button"
                  className="pure-button"
                  value="Nie"
                  onClick={() => handleAcceptOffer(false)}
                ></input>
              </div>
            </div>
          )}
        {gameManager.phase === "day" &&
          gameManager.endDayVoting.offeredBy &&
          gameManager.endDayVoting.offeredBy.id !== player.id &&
          player.isAlive &&
          !gameManager.endDayVoting.accepted &&
          gameManager.endDayVoting.agreements.some(
            (vote) => vote[0].id === player.id
          ) && (
            <p>
              Poczekaj, aż inni gracze podejmą decyzję, czy wyrażają zgodę,{" "}
              {gameManager.endDayVoting.offers[0].id === player.id
                ? "abyś"
                : `aby gracz ${gameManager.endDayVoting.offers[0].name}`}{" "}
              był pierwszą propozycją na{" "}
              {gameManager.endDayVoting.type === "kill"
                ? "zabicie"
                : "sprawdzenie"}
            </p>
          )}
        {gameManager.phase === "day" &&
          gameManager.endDayVoting.offeredBy &&
          gameManager.endDayVoting.offeredBy.id === player.id &&
          player.isAlive &&
          !gameManager.endDayVoting.accepted && (
            <p>
              Zaproponowałeś{" "}
              {gameManager.endDayVoting.type === "kill"
                ? "zabicie"
                : "sprawdzenie"}{" "}
              {gameManager.endDayVoting.offers[0].id === player.id
                ? "ciebie"
                : `gracza ${gameManager.endDayVoting.offers[0].name}`}
              : poczekaj, aż inni gracze wyrażą zgodę albo odrzucą Twoją
              propozycję
            </p>
          )}
        {gameManager.phase === "day" &&
          gameManager.endDayVoting.accepted &&
          gameManager.endDayVoting.offers[0].id === player.id &&
          player.isAlive &&
          gameManager.endDayVoting.offers.length === 1 && (
            <p>
              Propozycja{" "}
              {gameManager.endDayVoting.type === "kill"
                ? "zabicia"
                : "sprawdzenia"}{" "}
              ciebie została przyjęta: wybierz kontrpropozycję
            </p>
          )}
        {gameManager.phase === "day" &&
          gameManager.endDayVoting.accepted &&
          gameManager.endDayVoting.offers[0].id !== player.id &&
          player.isAlive &&
          gameManager.endDayVoting.offers.length === 1 && (
            <p>
              Czekaj: {gameManager.endDayVoting.offers[0].name} wybiera
              kontrpropozycję
            </p>
          )}
        {gameManager.phase === "day" &&
          gameManager.endDayVoting.accepted &&
          player.isAlive &&
          gameManager.endDayVoting.offers.length === 2 &&
          !gameManager.endDayVoting.votes.some(
            (vote) => vote[0].id === player.id
          ) && (
            <>
              <p>Zagłosuj:</p>
              <div>
                <input
                  type="button"
                  className="pure-button"
                  value={`${
                    gameManager.endDayVoting.type === "kill"
                      ? "Zabicie"
                      : "Sprawdzenie"
                  } ${
                    gameManager.endDayVoting.offers[0].id === player.id
                      ? "ciebie"
                      : `gracza ${gameManager.endDayVoting.offers[0].name}`
                  }`}
                  onClick={() =>
                    handleEndDayVote(
                      player,
                      gameManager.endDayVoting.offers[0],
                      gameManager.endDayVoting.type
                    )
                  }
                ></input>
                <input
                  type="button"
                  className="pure-button"
                  value={`${
                    gameManager.endDayVoting.type2 === "kill"
                      ? "Zabicie"
                      : "Sprawdzenie"
                  } ${
                    gameManager.endDayVoting.offers[1].id === player.id
                      ? "ciebie"
                      : `gracza ${gameManager.endDayVoting.offers[1].name}`
                  }`}
                  onClick={() =>
                    handleEndDayVote(
                      player,
                      gameManager.endDayVoting.offers[1],
                      gameManager.endDayVoting.type2
                    )
                  }
                ></input>
              </div>
            </>
          )}
        {gameManager.phase === "day" &&
          gameManager.endDayVoting.accepted &&
          player.isAlive &&
          gameManager.endDayVoting.offers.length === 2 &&
          gameManager.endDayVoting.votes.some(
            (vote) => vote[0].id === player.id
          ) && <p>Poczekaj, aż inni gracze oddadzą swój głos.</p>}
        {gameManager.phase === "day" &&
          gameManager.duel.offeredBy &&
          player.isAlive &&
          !gameManager.duel.accepted &&
          player.character.name !== "Sędzia" && (
            <p>
              Padło wyzwanie na pojedynek: poczekaj, aż Sędzia zadecyduje, czy
              wyraża na niego zgodę
            </p>
          )}
        {gameManager.phase === "day" &&
          gameManager.duel.offeredBy &&
          player.isAlive &&
          !gameManager.duel.accepted &&
          player.character.name === "Sędzia" &&
          gameManager.mścicielChoice !== "Sędzia" && (
            <>
              <p>
                Czy wyrażasz zgodę na pojedynek między graczami:{" "}
                {gameManager.duel.offeredBy.id === player.id
                  ? "ty"
                  : gameManager.duel.offeredBy.name}{" "}
                i{" "}
                {gameManager.duel.offer.id === player.id
                  ? "ty"
                  : gameManager.duel.offer.name}
                ?
              </p>
              <div>
                <input
                  type="button"
                  className="pure-button"
                  value="Tak"
                  onClick={() => handleSędziaDecision(true)}
                ></input>
                <input
                  type="button"
                  className="pure-button"
                  value="Nie"
                  onClick={() => handleSędziaDecision(false)}
                ></input>
              </div>
            </>
          )}
        {gameManager.phase === "day" &&
          player.isAlive &&
          gameManager.duel.accepted &&
          player.id !== gameManager.duel.offeredBy.id &&
          player.id !== gameManager.duel.offer.id &&
          !gameManager.duel.votes.some((vote) => vote[0].id === player.id) && (
            <>
              <p>
                Trwa pojedynek: podejmij decyzję, na kogo śmierć głosujesz albo
                wstrzymaj się od głosu
              </p>
              <div>
                <input
                  type="button"
                  className="pure-button"
                  value={`Śmierć gracza ${gameManager.duel.offeredBy.name}`}
                  onClick={() => handleDuelVote(gameManager.duel.offeredBy)}
                ></input>
                <input
                  type="button"
                  className="pure-button"
                  value={`Śmierć gracza ${gameManager.duel.offer.name}`}
                  onClick={() => handleDuelVote(gameManager.duel.offer)}
                ></input>
                <input
                  type="button"
                  className="pure-button"
                  value="Wstrzymaj się od głosu"
                  onClick={() => handleDuelVote("noVote")}
                ></input>
              </div>
            </>
          )}
        {gameManager.phase === "day" &&
          player.isAlive &&
          gameManager.duel.accepted &&
          (player.id === gameManager.duel.offeredBy.id ||
            player.id === gameManager.duel.offer.id) && (
            <p>
              Trwa pojedynek, w którym uczestniczysz: poczekaj, aż wszyscy
              gracze oddadzą głos
            </p>
          )}
        {gameManager.phase === "day" &&
          player.isAlive &&
          gameManager.duel.accepted &&
          player.id !== gameManager.duel.offeredBy.id &&
          player.id !== gameManager.duel.offer.id &&
          gameManager.duel.votes.some((vote) => vote[0].id === player.id) && (
            <p>Poczekaj, aż inni gracze zadecydują, na kogo oddają swój głos</p>
          )}
      </div>
    </div>
  );
};

export default Orders;
