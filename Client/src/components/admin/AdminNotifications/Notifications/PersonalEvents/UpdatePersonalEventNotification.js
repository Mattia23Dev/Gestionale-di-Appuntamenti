import React from "react";
import { BiCalendarEdit } from "react-icons/bi";
import { IoMdTime } from "react-icons/io";
import { format } from "timeago.js";
import moment from "moment";

const UpdatePersonalEventNotification = (props) => {
  const { notification, employee } = props;

  const createdByName =
    notification.createdByFirstName + " " + notification.createdByLastName;
  const originalAssociatedStaffName =
    notification.originalAssociatedStaffFirstName +
    " " +
    notification.originalAssociatedStaffLastName;
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
          color: "rgb(171, 124, 56)",
          background: "rgba(171, 124, 56, 0.3)",
        }}
      >
        <BiCalendarEdit />
      </div>
      <div className="admin_individual_notification_message_info">
        <p>
          <strong>
            {createdByName === signedInEmployeeName ? "Tu hai" : `${createdByName} ha`}
          </strong>{" "}
          aggiornato un evento personale
          {createdByName === signedInEmployeeName ? (
            " "
          ) : (
            <>
              {" "}
              nel{" "}
              {originalAssociatedStaffName === signedInEmployeeName ? (
                <strong>tuo</strong>
              ) : createdByName === originalAssociatedStaffName ? (
                <strong>loro</strong>
              ) : (
                <strong>{`${originalAssociatedStaffName}`}</strong>
              )}{" "}
              calendario{" "}
            </>
          )}
          per {notification.allDay ? <strong>tutto il giorno</strong> : null}{" "}
          {notification.allDay ? "di " : null}
          <strong>
            {moment(new Date(notification.date)).format("MMMM Do, YYYY")}
          </strong>
          {notification.allDay ? "." : " alle ore "}
          {notification.allDay ? null : notification.time ? (
            <strong>{notification.time}</strong>
          ) : null}
          {notification.allDay ? null : "."}
        </p>
        <div className="admin_notification_time_ago">
          <IoMdTime />{" "}
          {notification.createdAt
            ? format(
                new Date(parseInt(notification._id.substring(0, 8), 16) * 1000)
              )
            : null}
        </div>
      </div>
    </div>
  );
};

export default UpdatePersonalEventNotification;
