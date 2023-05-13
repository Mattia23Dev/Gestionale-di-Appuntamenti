import React from "react";
import "./Bacial.css";
import "../../treatments/card_styling.css";

const BacialRemovedNotification = (props) => {
  return (
    <div className="notification_removed_container">
      <div className="notification_text_container">
        <h3>{props.serviceName} rimosso</h3>
        <p>Il servizio {props.serviceName}  è stato rimosso dal carrello, scegli un altro servizio.</p>
      </div>
    </div>
  );
};

export default BacialRemovedNotification;
