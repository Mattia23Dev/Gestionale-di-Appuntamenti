import React from "react";
import { FiUserMinus } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { format } from "timeago.js";

const RemoveClientNotification = (props) => {
  const { notification, employee } = props;

  const associatedClientName =
    notification.associatedClientFirstName +
    " " +
    notification.associatedClientLastName;
  const createdByName =
    notification.createdByFirstName + " " + notification.createdByLastName;
  const signedInEmployeeName = employee.firstName + " " + employee.lastName;

  return (
    <div
      className="admin_individual_notification_container"
      style={{
        background:
          notification.new === true
            ? "rgba(211, 211, 211, 0.3)"
            : "transparent",
      }}
    >
      <div
        className="admin_notification_main_icon_container"
        style={{
          color: "rgb(204, 102, 102)",
          background: "rgba(204, 102, 102, 0.3)",
        }}
      >
        <FiUserMinus />
      </div>
      <div className="admin_individual_notification_message_info">
        <p>
          <strong>
            {createdByName === signedInEmployeeName ? "Tu hai" : `${createdByName} ha`}
          </strong>{" "}
          rimosso <strong>{associatedClientName}</strong> dalla lista clienti.
        </p>
        <div className="admin_notification_time_ago">
          <IoMdTime />{" "}
          {notification.createdAt
            ? format(
                new Date(parseInt(notification._id.substring(0, 8), 16) * 1000)
              ).toLocaleString('it-IT')
            : null}
        </div>
      </div>
    </div>
  );
};

export default RemoveClientNotification;
