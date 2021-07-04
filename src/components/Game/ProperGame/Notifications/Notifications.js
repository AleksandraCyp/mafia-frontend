import "./Notifications.css";

const Notifications = ({ gameManager, player }) => {
  const myNotifications = (notifications) => {
    return notifications.map((notification, index) => {
      if (notification.to.includes(player.character.name))
        return <li key={index}>{notification.text}</li>;
    });
  };

  return (
    <div className="container notificationsContainer">
      <h2>Powiadomienia</h2>
      <ul className="notifications">
        {myNotifications(gameManager.notifications)}
      </ul>
    </div>
  );
};

export default Notifications;
