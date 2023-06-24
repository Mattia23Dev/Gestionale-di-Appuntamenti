import React from "react";
import moment from "moment";
import AddToCalendar from "react-add-to-calendar";
import "react-add-to-calendar/dist/react-add-to-calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faLongArrowAltLeft,
  faTimes,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import BounceLoader from "react-spinners/BounceLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { Transition } from "react-spring/renderprops";
import { useDispatch } from "react-redux";
import { css } from "@emotion/css";
import ACTION_CANCEL_APPOINTMENT_CLICKED_RESET from "../../../../../actions/CancelAppointmentClicked/ACTION_CANCEL_APPOINTMENT_CLICKED_RESET";
import ACTION_CANCEL_APPOINTMENT_CLICKED from "../../../../../actions/CancelAppointmentClicked/ACTION_CANCEL_APPOINTMENT_CLICKED";
import "../../../../../components/checkout/SummaryReviewCards/SummaryReviewCards.css";
import "../../../../../components/treatments/Bacial/Bacial.css";
import "../../../../../components/treatments/Calm/Calm.css";
import "../../../../../components/treatments/CBD/CBD.css";
import "../../../../../components/treatments/ChemicalPeel/ChemicalPeel.css";
import "../../../../../components/treatments/Clarify/Clarify.css";
import "../../../../../components/treatments/Dermaplaning/Dermaplaning.css";
import "../../../../../components/treatments/Glow/Glow.css";
import "../../../../../components/treatments/JetHydroPeel/JetHydroPeel.css";
import "../../../../../components/treatments/Microneedle/Microneedle.css";
import "../../../../../components/treatments/Quench/Quench.css";
import "../../../../../components/treatments/Quickie/Quickie.css";
import "../../../../../components/treatments/Rejuvenate/Rejuvenate.css";
import "../../../../../components/treatments/SaltCave/SaltCave.css";
import "../../../../../components/treatments_pages/Page_2/NotSurePopUp/NotSurePopUp.css";

const ClientRenderUpcomingAppointments = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const {
    upcomingAppointmentsData,
    loadingSpinnerActive,
    currentScreenSize,
    initialScreenSize,
    handleAppointmentToggled,
    cancelAppointmentClicked,
    logoutClicked,
    appointmentToggled,
    handleCancelAppointment,
    handleAppointmentUntoggled,
    renderSummaryCardTreatments,
    loadingAppointments,
  } = props;

  const {
    individualAppointmentRef,
    selectedAppointmentBackRef,
    backToAppointmentsRef,
  } = ref;

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  return (
    <>
      {upcomingAppointmentsData ? (
        upcomingAppointmentsData.own_appointments.length > 0 ? (
          upcomingAppointmentsData.own_appointments.map((item, i) => {
            const event = {
              title: "Prneotazioni Glow Labs",
              description:
                (item.treatments[0].name
                  ? item.treatments[0].name === "ChemicalPeel"
                    ? "Chemical Peel"
                    : item.treatments[0].name
                  : "") +
                (item.treatments[0].name === "Salt Cave"
                  ? " Treatment"
                  : " Facial") +
                (item.addOns[0]
                  ? item.addOns[0].name
                    ? ", " +
                      item.addOns
                        .map((x) =>
                          x.name === "ExtraExtractions"
                            ? "Extra Extractions Add On"
                            : x.name + " Add On"
                        )
                        .join(", ")
                    : ""
                  : ""),
              location: "1506 Broadway, Hewlett, NY 11557",
              startTime: moment(
                moment(item.date, "LL")
                  .format("LLLL")
                  .split(" ")
                  .slice(
                    0,
                    moment(item.date, "LL")
                      .format("LLLL")
                      .split(" ").length - 2
                  )
                  .join(" ") +
                  " " +
                  item.startTime +
                  " " +
                  item.morningOrEvening,
                "LLLL"
              ).format(),
              endTime: moment(
                moment(item.date, "LL")
                  .format("LLLL")
                  .split(" ")
                  .slice(
                    0,
                    moment(item.date, "LL")
                      .format("LLLL")
                      .split(" ").length - 2
                  )
                  .join(" ") +
                  " " +
                  item.startTime +
                  " " +
                  item.morningOrEvening,
                "LLLL"
              )
                .add(item.duration, "minutes")
                .format(),
            };

            return (
              <div
                key={i}
                className="my_individual_appointment_container"
                onClick={(e) => handleAppointmentToggled(e, item)}
                ref={individualAppointmentRef}
              >
                <Modal
                  isOpen={
                    cancelAppointmentClicked && appointmentToggled === item.id
                  }
                  className="cancel_appointment_modal"
                  style={{
                    content: {
                      position: "fixed",
                      zIndex: 10000,
                      opacity: 0.99,
                      height: "100%",
                      backdropFilter: "blur(5px)",
                      WebkitBackdropFilter: "blur(5px)",
                      paddingBottom: "10%",
                      borderRadius: "none",
                      width: "100vw",
                      top: "0",
                      left: "0",
                      right: "0",
                      bottom: "0",
                      border: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  <BounceLoader
                    size={100}
                    css={override}
                    color={"rgb(44, 44, 52)"}
                    loading={loadingSpinnerActive}
                  />
                  <div
                    className="cancel_appointment_modal_content_container"
                    style={{
                      display:
                        cancelAppointmentClicked && !loadingSpinnerActive
                          ? "flex"
                          : "none",
                    }}
                  >
                    <div className="log_out_modal_contents">
                      <FontAwesomeIcon
                        className="modal_x"
                        icon={faTimes}
                        onClick={() =>
                          dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED_RESET())
                        }
                      />
                      <h2>Sei sicuro di cancellare l'appuntamento?</h2>
                      <span className="logout_buttons_container">
                        <div
                          className="logout_button yes_cancel_appointment_button"
                          onClick={() => handleCancelAppointment(item)}
                        >
                          <p>SI, CANCELLA</p>
                        </div>
                        <div
                          className="cancel_logout_button no_dont_cancel_appointment_button"
                          onClick={() =>
                            dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED_RESET())
                          }
                        >
                          <p>NO, INDIETRO</p>
                        </div>
                      </span>
                    </div>
                  </div>
                </Modal>
                <div className="my_appointment_date_square">
                  <p>
                    {item.date
                      .split(" ")[1]
                      .slice(0, item.date.split(" ")[1].indexOf(","))}
                  </p>
                  <p>
                    {item.date
                      .split(" ")[0]
                      .slice(0, 3)
                      .toUpperCase()}
                  </p>
                </div>
                <div className="my_appointment_information_container">
                  <p className="my_appointment_date_time">
                    {moment(item.date, "LL")
                      .format("LLLL")
                      .split(" ")
                      .slice(
                        0,
                        moment(item.date, "LL")
                          .format("LLLL")
                          .split(" ").length - 2
                      )
                      .join(" ") + ", "}
                    {!currentScreenSize ? (
                      initialScreenSize >= 1200 ? (
                        <br />
                      ) : null
                    ) : currentScreenSize >= 1200 ? (
                      <br />
                    ) : null}
                    {item.startTime +
                      " " +
                      (Number(item.startTime.split(":")[0]) >= 12 ||
                      Number(item.startTime.split(":")[0]) < 9
                        ? "PM"
                        : "AM")}
                  </p>
                  <p className="my_appointment_details">
                    {item.treatments[0].name
                      ? item.treatments[0].name === "ChemicalPeel"
                        ? "Chemical Peel Facial"
                        : item.treatments[0].name === "Salt Cave"
                        ? "Salt Cave"
                        : item.treatments[0].name + " Facial"
                      : null}
                  </p>
                  <p className="my_appointment_details">
                    {item.duration >= 60
                      ? Math.floor(item.duration / 60)
                      : item.duration}{" "}
                    {item.duration >= 60
                      ? Math.floor(item.duration / 60) === 1
                        ? "ora"
                        : "ore"
                      : null}{" "}
                    {item.duration >= 60
                      ? Number.isInteger(item.duration / 60)
                        ? null
                        : item.duration -
                          Math.floor(item.duration / 60) * 60 +
                          " minuti"
                      : "minuti"}
                  </p>
                </div>

                <FontAwesomeIcon
                  style={{
                    zIndex: cancelAppointmentClicked
                      ? -1
                      : logoutClicked || appointmentToggled
                      ? 0
                      : 1,
                    transitionDelay: logoutClicked
                      ? "initial"
                      : !appointmentToggled
                      ? "0.5s"
                      : "initial",
                  }}
                  icon={faEllipsisH}
                  className="my_individual_appointment_expand_icon"
                />
                <Transition
                  items={appointmentToggled}
                  from={{ transform: "translateX(-100%)" }}
                  enter={{ transform: "translateX(0%)" }}
                  leave={{ transform: "translateX(-100%)" }}
                  config={{ duration: 200 }}
                >
                  {(appointmentToggled) =>
                    appointmentToggled === item.id &&
                    ((styleprops) => (
                      <div
                        className="my_individual_selected_appointment_container"
                        style={{
                          ...styleprops,
                          ...{ zIndex: cancelAppointmentClicked ? 0 : 1 },
                        }}
                      >
                        <div className="my_individual_selected_appointment_contents_container">
                          <div
                            className="my_individual_selected_appointment_back_container"
                            ref={selectedAppointmentBackRef}
                            onClick={(e) => handleAppointmentUntoggled(e)}
                          >
                            <FontAwesomeIcon
                              icon={faLongArrowAltLeft}
                              className="my_individual_selected_appointment_back_arrow_icon"
                            />
                            <p>Torna alle prenotazioni in arrivo</p>
                          </div>
                          <div className="selected_appointment_date_and_time_header">
                            <p>Data appuntamento &amp; Orario</p>
                          </div>
                          <div className="selected_appointment_date_and_time_content_container">
                            <div className="selected_appointment_date_and_time_content">
                              <p>
                                {moment(item.date, "LL")
                                  .format("LLLL")
                                  .split(" ")
                                  .slice(
                                    0,
                                    moment(item.date, "LL")
                                      .format("LLLL")
                                      .split(" ").length - 2
                                  )
                                  .join(" ")}
                              </p>
                              <p>
                                {item.startTime +
                                  " " +
                                  (Number(item.startTime.split(":")[0]) >= 12 ||
                                  Number(item.startTime.split(":")[0]) < 9
                                    ? "PM"
                                    : "AM")}{" "}
                                -{" "}
                                {item.endTime +
                                  " " +
                                  (Number(item.endTime.split(":")[0]) >= 12 ||
                                  Number(item.endTime.split(":")[0]) < 9
                                    ? "PM"
                                    : "AM")}{" "}
                              </p>
                              <p>
                                (
                                {item.duration >= 60
                                  ? Math.floor(item.duration / 60)
                                  : item.duration}{" "}
                                {item.duration >= 60
                                  ? Math.floor(item.duration / 60) === 1
                                    ? "ora"
                                    : "ore"
                                  : null}
                                {Number.isInteger(item.duration / 60)
                                  ? null
                                  : " "}
                                {item.duration >= 60
                                  ? Number.isInteger(item.duration / 60)
                                    ? null
                                    : item.duration -
                                      Math.floor(item.duration / 60) * 60 +
                                      " minuti"
                                  : "minuti"}
                                )
                              </p>
                            </div>

                            <div className="add_to_calendar_button_container">
                              <AddToCalendar
                                buttonTemplate={{ "calendar-plus-o": "left" }}
                                buttonLabel="Add to Calendar"
                                event={event}
                              />
                            </div>
                          </div>
                          <div className="selected_appointment_treatments_header">
                            <p>
                              {item.treatments[0].name === "Salt Cave"
                                ? null
                                : item.esthetician
                                ? "(con " + item.esthetician + ")"
                                : null}
                            </p>
                          </div>
                          {renderSummaryCardTreatments(i)}
                          <div className="selected_appointment_total_header">
                            <p>Totale</p>
                            <p>{item.price},00 €</p>
                          </div>
                          <div className="selected_appointments_bottom_buttons_container">
                            <div
                              className="cancel_appointment_button"
                              onClick={() =>
                                dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED())
                              }
                            >
                              <p>Cancella appuntamento</p>
                            </div>
                            <div
                              className="back_to_all_appointments_button"
                              ref={backToAppointmentsRef}
                              onClick={(e) => handleAppointmentUntoggled(e)}
                            >
                              <p>Torna alle prenotazioni</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </Transition>
              </div>
            );
          })
        ) : (
          <div className="my_upcoming_appointments_empty_container">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="my_upcoming_appointments_empty_calendar_icon"
            />
            <h2>Nessun appuntamento in arrivo</h2>
            <p>
              Qualsiasi appuntamento futuro apparirà qui
            </p>
          </div>
        )
      ) : loadingAppointments ? (
        <div className="my_upcoming_appointments_empty_container">
          <ClipLoader
            size={100}
            css={override}
            color={"rgb(44, 44, 52)"}
            loading={loadingAppointments}
          />
        </div>
      ) : (
        <div className="my_upcoming_appointments_empty_container">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="my_upcoming_appointments_empty_calendar_icon"
          />
          <h2>Nessun appuntamento in arrivo</h2>
          <p>
          Qualsiasi appuntamento futuro apparirà qui
          </p>
        </div>
      )}
    </>
  );
});

export default ClientRenderUpcomingAppointments;
