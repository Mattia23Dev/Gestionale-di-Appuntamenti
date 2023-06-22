import React, { useEffect, useState, useRef } from "react";
import { Transition } from "react-spring/renderprops";
import { faLongArrowAltLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import getClientQuery from "../../../graphql/queries/getClientQuery";
import addDescription from "../../../graphql/mutations/addDescriptionMutation";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Modal from "react-modal";
import { css } from "@emotion/css";
import { FormGroup, Input } from "reactstrap";
import {
  faShoppingCart,
  faChevronLeft,
  faChevronRight,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import "react-dropdown/style.css";
import "react-day-picker/lib/style.css";
import "./AdminClients";
// import { useHistory } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import getEmployeesQuery from "../../../graphql/queries/getEmployeesQuery";

const AdminClientDescription = (props) => {
  const [description, setDescription] = useState("");
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );
  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;
  const [updateClientInformation, { loading, data1 }] = useMutation(
    addDescription
  );

  const { data } = useQuery(getClientQuery, {
    fetchPolicy: "no-cache",
    variables: {
      _id: props.clientToggled,
    },
  });
  if (data) console.log(data.client, "Client data");
  useEffect(() => {
    if (data) {setDescription(data.client.description !== undefined ? data.client.description : '')};
  }, [data]);
  const navigate = useHistory()
  const handleCompleteRegistration = () => {
    updateClientInformation({
      variables: { description: description , 

        _id: props.clientToggled,

    },
    onCompleted: (data) => {
        console.log(data, "data");
        // perform any data processing here
        console.log(data, "data");
        navigate.go(0);

    }
    });
  };
  return (
    <div>
      <Modal
        isOpen={loadingSpinnerActive}
        style={{
          content: {
            position: "fixed",
            zIndex: "10000",
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
      </Modal>
      <div className="admin_individual_selected_employee_contents">
        {/* <div className="admin_individual_selected_client_back_container">
                <FontAwesomeIcon
                  icon={faLongArrowAltLeft}
                  className="admin_individual_selected_client_back_arrow_icon"
                />
              </div> */}
        <div className="admin_create_appointment_section_header">
          <h2>Customer Description</h2>
          
        </div>
        <h4>{description}</h4>
        <div className="esthetician_preference_dropdown_input_field">
          <div
            role="combobox"
            aria-haspopup="listbox"
            aria-owns="react-autowhatever-1"
            aria-controls="react-autowhatever-1"
            aria-expanded="false"
            className="react-autosuggest__container"
            //   style={{
            //     outline: emplError ? "3px solid red" : "none",
            //     zIndex: emplError ? 99999 : "auto",
            //   }}
          ></div>
        </div>

        <div className="admin_create_appointment_input_information_container">
          {/* <div className="admin_create_appointment_label admin_create_appointment_double_label">
            Description
          </div> */}
          <div
            role="combobox"
            aria-haspopup="listbox"
            aria-owns="react-autowhatever-1"
            aria-controls="react-autowhatever-1"
            aria-expanded="false"
            className="react-autosuggest__container"
            //   style={{
            //     outline: nameError ? "3px solid red" : "none",
            //     zIndex: nameError ? 99999 : "auto",
            //   }}
          >
            <textarea
              type="text"
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls="react-autowhatever-1"
              className="react-autosuggest__input"
              value={description || ''}
              // onChange={(e) => {
              //   resetAllErrorStates();
              //   dispatch(
              //     ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME(e.target.value)
              //   );
              // }}
              onChange={(e) => {

                setDescription(e.target.value);
              }}
              rows={4}
              placeholder="Aggiungi la descrizione del cliente"
            />
          </div>
        </div>
        <div className="admin_square_payment_form_container">
          <div className="sq-payment-form">
            <div
              className="sq-creditcard"
                onClick={handleCompleteRegistration}
            >
              {data && data.client.description ? "Modifica" : "Aggiungi"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClientDescription;