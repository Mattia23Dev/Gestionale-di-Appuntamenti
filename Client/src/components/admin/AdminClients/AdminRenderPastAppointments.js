import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faLongArrowAltLeft,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CalmSummaryCard from "../../checkout/SummaryReviewCards/Treatments/CalmSummaryCard";
import BacialSummaryCard from "../../checkout/SummaryReviewCards/Treatments/BacialSummaryCard";
import ClarifySummaryCard from "../../checkout/SummaryReviewCards/Treatments/ClarifySummaryCard";
import DermaplaningSummaryCard from "../../checkout/SummaryReviewCards/Treatments/DermaplaningSummaryCard";
import GlowSummaryCard from "../../checkout/SummaryReviewCards/Treatments/GlowSummaryCard";
import QuenchSummaryCard from "../../checkout/SummaryReviewCards/Treatments/QuenchSummaryCard";
import QuickieSummaryCard from "../../checkout/SummaryReviewCards/Treatments/QuickieSummaryCard";
import ChemicalPeelSummaryCard from "../../checkout/SummaryReviewCards/Treatments/ChemicalPeelSummaryCard";
import CBDSummaryCard from "../../checkout/SummaryReviewCards/Treatments/CBDSummaryCard";
import MicroneedleSummaryCard from "../../checkout/SummaryReviewCards/Treatments/MicroneedleSummaryCard";
import RejuvenateSummaryCard from "../../checkout/SummaryReviewCards/Treatments/RejuvenateSummaryCard";
import UnsureSummaryCard from "../../checkout/SummaryReviewCards/Treatments/UnsureSummaryCard";
import ExtraExtractionsSummaryCard from "../../checkout/SummaryReviewCards/AddOns/ExtraExtractionsCard";
import HydroJellyMaskSummaryCard from "../../checkout/SummaryReviewCards/AddOns/HydroJellyMaskSummaryCard";
import LEDTherapySummaryCard from "../../checkout/SummaryReviewCards/AddOns/LEDTherapySummaryCard";
import MicrocurrentSummaryCard from "../../checkout/SummaryReviewCards/AddOns/MicrocurrentSummaryCard";
import MicrodermabrasionSummaryCard from "../../checkout/SummaryReviewCards/AddOns/MicrodermabrasionSummaryCard";
import DermarollingSummaryCard from "../../checkout/SummaryReviewCards/AddOns/DermarollingSummaryCard";
import NanoNeedlingSummaryCard from "../../checkout/SummaryReviewCards/AddOns/NanoNeedlingSummaryCard";
import GuaShaSummaryCard from "../../checkout/SummaryReviewCards/AddOns/GuaShaSummaryCard";
import BeardSummaryCard from "../../checkout/SummaryReviewCards/AddOns/BeardSummaryCard";
import SaltCaveSummaryCard from "../../checkout/SummaryReviewCards/Treatments/SaltCaveSummaryCard";
import "../../account/clientprofile/MyAppointments/MyAppointments.css";
import "../../../components/checkout/SummaryReviewCards/SummaryReviewCards.css";
import "../../../components/treatments/Bacial/Bacial.css";
import "../../../components/treatments/Calm/Calm.css";
import "../../../components/treatments/CBD/CBD.css";
import "../../../components/treatments/ChemicalPeel/ChemicalPeel.css";
import "../../../components/treatments/Clarify/Clarify.css";
import "../../../components/treatments/Dermaplaning/Dermaplaning.css";
import "../../../components/treatments/Glow/Glow.css";
import "../../../components/treatments/JetHydroPeel/JetHydroPeel.css";
import "../../../components/treatments/Microneedle/Microneedle.css";
import "../../../components/treatments/Quench/Quench.css";
import "../../../components/treatments/Quickie/Quickie.css";
import "../../../components/treatments/Rejuvenate/Rejuvenate.css";
import "../../../components/treatments/SaltCave/SaltCave.css";
import "../../../components/treatments_pages/Page_2/NotSurePopUp/NotSurePopUp.css";

const AdminRenderUpcomingAppointments = (props) => {
  const location = useLocation();
  const individualAppointmentRef = useRef(null);
  const selectedAppointmentBackRef = useRef(null);
  const backToAppointmentsRef = useRef(null);

  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const [appointmentToggled, changeAppointmentToggled] = useState("");

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const treatmentsSummaryCardComponentsArr = [
    { name: "Calm", component: <CalmSummaryCard /> },
    { name: "Bacial", component: <BacialSummaryCard /> },
    { name: "Clarify", component: <ClarifySummaryCard /> },
    { name: "Dermaplaning", component: <DermaplaningSummaryCard /> },
    { name: "Glow", component: <GlowSummaryCard /> },
    { name: "Quench", component: <QuenchSummaryCard /> },
    { name: "Quickie", component: <QuickieSummaryCard /> },
    { name: "ChemicalPeel", component: <ChemicalPeelSummaryCard /> },
    { name: "CBD", component: <CBDSummaryCard /> },
    { name: "Microneedling", component: <MicroneedleSummaryCard /> },
    { name: "Rejuvenate", component: <RejuvenateSummaryCard /> },
    { name: "Not Sure", component: <UnsureSummaryCard /> },
    { name: "Salt Cave", component: <SaltCaveSummaryCard /> },
  ];

  const renderSummaryCardTreatments = (dataIndex) => {
    let componentsArr = [];

    for (let i = 0; i < treatmentsSummaryCardComponentsArr.length; i++) {
      if (props.data) {
        if (props.data.own_past_appointments) {
          if (props.data.own_past_appointments[dataIndex].treatments) {
            if (
              props.data.own_past_appointments[dataIndex].treatments[0].name
            ) {
              if (
                props.data.own_past_appointments[dataIndex].treatments[0]
                  .name === treatmentsSummaryCardComponentsArr[i].name
              ) {
                componentsArr.push(
                  treatmentsSummaryCardComponentsArr[i].component
                );
              }
            }
          }
        }
      }
    }
    return componentsArr.map((item, index) => (
      <div
        className="my_selected_appointment_treatment_container admin_side_client_treatment_container"
        key={index}
      >
        {item}
      </div>
    ));
  };

  // Allows click only if selected appointment modal is not active

  const handleAppointmentToggled = (e, item) => {
    if (e.currentTarget && individualAppointmentRef) {
      if (individualAppointmentRef.current) {
        if (
          individualAppointmentRef.current.className ===
          e.currentTarget.className
        ) {
          if (selectedAppointmentBackRef) {
            if (!selectedAppointmentBackRef.current) {
              if (item) {
                if (item.id) {
                  changeAppointmentToggled(item.id);
                }
              }
            }
          }
        }
      }
    }
  };

  // Function for back arrow click to reset selected toggled appointment

  const handleAppointmentUntoggled = (e) => {
    if (
      (e.currentTarget && selectedAppointmentBackRef) ||
      (e.currentTarget && backToAppointmentsRef)
    ) {
      if (selectedAppointmentBackRef.current || backToAppointmentsRef.current) {
        if (
          selectedAppointmentBackRef.current.className ===
            e.currentTarget.className ||
          backToAppointmentsRef.current.className === e.currentTarget.className
        ) {
          changeAppointmentToggled("");
        }
      }
    }
  };

  const renderNoPastAppointments = () => {
    return (
      <div className="my_upcoming_appointments_empty_container">
        <FontAwesomeIcon
          icon={faHistory}
          className="my_upcoming_appointments_empty_calendar_icon"
        />
        <h2>Nessun appuntamento passato</h2>
        <p>
          {props.item.firstName[0].toUpperCase() +
            props.item.firstName.slice(1).toLowerCase() +
            " " +
            props.item.lastName[0].toUpperCase() +
            props.item.lastName.slice(1).toLowerCase() +
            " non ha nessun appuntamento passato."}
        </p>
      </div>
    );
  };

  return (
    <>
      {props.data
        ? props.data.own_past_appointments
          ? props.data.own_past_appointments.length > 0
            ? props.data.own_past_appointments.map((item, i) => (
                <div
                  key={i}
                  className="admin_side_my_individual_appointment_container"
                  onClick={(e) => handleAppointmentToggled(e, item)}
                  ref={individualAppointmentRef}
                >
                  <div className="my_past_appointment_date_square">
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
                      {moment(item.date)
                      .locale('it')
                        .format("LLLL")
                        .split(" ")
                        .slice(
                          0,
                          moment(item.date, "LL")
                            .format("LLLL")
                            .split(" ").length - 2
                        )
                        .join(" ") + ", "}
                      {!props.currentScreenSize ? (
                        props.initialScreenSize >= 1200 ? (
                          <br />
                        ) : null
                      ) : props.currentScreenSize >= 1200 ? (
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
                        ? item.treatments[0].name
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
                      zIndex: logoutClicked || appointmentToggled ? 0 : 1,
                      transitionDelay: logoutClicked
                        ? "initial"
                        : !appointmentToggled
                        ? "0.5s"
                        : "initial",
                    }}
                    icon={faEllipsisH}
                    className="admin_side_my_individual_appointment_expand_icon"
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
                          className="admin_side_my_individual_selected_appointment_container"
                          style={styleprops}
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
                              <p>Torna agli appuntamenti passati</p>
                            </div>
                            <div className="selected_appointment_date_and_time_header">
                              <p>Informazioni cliente</p>
                            </div>
                            <div className="selected_appointment_date_and_time_content_container">
                              <div className="selected_appointment_date_and_time_content">
                                <p>
                                  {item.client.firstName[0].toUpperCase() +
                                    item.client.firstName
                                      .slice(1)
                                      .toLowerCase() +
                                    " " +
                                    item.client.lastName[0].toUpperCase() +
                                    item.client.lastName.slice(1).toLowerCase()}
                                </p>
                                <p>{item.client.phoneNumber}</p>
                                <p>{item.client.email}</p>
                              </div>
                            </div>
                            <div className="selected_appointment_date_and_time_header">
                              <p>Data apuntamento &amp; Orario</p>
                            </div>
                            <div className="selected_appointment_date_and_time_content_container">
                              <div className="selected_appointment_date_and_time_content">
                                <p>
                                  {moment(item.date)
                                  .locale('it')
                                    .format("LLLL")
                                    .split(" ")
                                    .slice(
                                      0,
                                      moment(item.date, 'LL')
                                        .format("LLLL")
                                        .split(" ").length - 2
                                    )
                                    .join(" ")}
                                </p>
                                <p>
                                  {item.startTime +
                                    " " +
                                    (Number(item.startTime.split(":")[0]) >=
                                      12 ||
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
                            </div>
                            <div className="selected_appointment_treatments_header">
                              <p>
                                Trattamento{" "}
                                {item.treatments[0].name === "Salt Cave"
                                  ? null
                                  : item.esthetician
                                  ? "con " + item.esthetician
                                  : null}
                              </p>
                              <p>
                              {item.treatments ? item.treatments[0].name : null}
                              </p>
                            </div>
                            {renderSummaryCardTreatments(i)}
                            <div className="selected_appointment_total_header admin_side_total_header">
                              <p>Totale</p>
                              <p>{item.price},00 €</p>
                            </div>
                            <div className="selected_appointment_date_and_time_header">
                              <p>Note</p>
                            </div>
                            <div className="selected_appointment_date_and_time_content_container">
                              <div className="selected_appointment_date_and_time_content">
                                <p>
                                  {props.data
                                    ? props.data.own_appointments
                                      ? props.data.own_appointments[i].notes
                                        ? props.data.own_appointments[i].notes
                                        : "Nessuna nota fornita"
                                      : "Nessuna nota fornita"
                                    : "Nessuna nota fornita"}
                                </p>
                              </div>
                            </div>
                            <div className="selected_past_appointments_bottom_buttons_container">
                              <div
                                className="back_to_all_appointments_button"
                                ref={backToAppointmentsRef}
                                onClick={(e) => handleAppointmentUntoggled(e)}
                              >
                                <p>Torna agli appuntamenti</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </Transition>
                </div>
              ))
            : renderNoPastAppointments()
          : renderNoPastAppointments()
        : renderNoPastAppointments()}
    </>
  );
};

export default AdminRenderUpcomingAppointments;
