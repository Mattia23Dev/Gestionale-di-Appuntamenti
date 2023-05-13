import React from "react";
import "./Bacial.css";
import "../../treatments/card_styling.css";

const BacialNotification = (props) => {
  const imageUrl = process.env.SERVER_URL || "http://localhost:4000/uploads/";
  return (
    <div className="notification_container">
      <div className="notification_text_container">
        <h3>{props.serviceName} aggiunto</h3>
        <p>Il servizio {props.serviceName} è stato aggiunto, continua la prenotazione</p>
      </div>
    </div>
  );
};

export default BacialNotification;
