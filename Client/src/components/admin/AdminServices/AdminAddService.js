import React, { useEffect, useState, useRef } from "react";
import { Transition } from "react-spring/renderprops";
import { faLongArrowAltLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
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
import { useHistory } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import getEmployeesQuery from "../../../graphql/queries/getEmployeesQuery";
import {Select} from 'antd'
import { ApolloError } from "apollo-client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import addServiceMutation from "../../../graphql/mutations/addServiceMutaion";
import addEmployeeMutation from "../../../graphql/mutations/addEmployeeMutation";
import Dropdown from "react-dropdown";
import getServiceQuery from "../../../graphql/queries/getServiceQuery"
import ACTION_ADMIN_STAFF_MEMBER_PHONE_NUMBER from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberPhoneNumber/ACTION_ADMIN_STAFF_MEMBER_PHONE_NUMBER";
import ACTION_ADMIN_STAFF_MEMBER_PHONE_NUMBER_RESET from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberPhoneNumber/ACTION_ADMIN_STAFF_MEMBER_PHONE_NUMBER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_ADMIN_STAFF_MEMBER_EMAIL from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberEmail/ACTION_ADMIN_STAFF_MEMBER_EMAIL";
import ACTION_ADMIN_STAFF_MEMBER_EMAIL_RESET from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberEmail/ACTION_ADMIN_STAFF_MEMBER_EMAIL_RESET";
import ACTION_ADMIN_STAFF_MEMBER_LAST_NAME from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberLastName/ACTION_ADMIN_STAFF_MEMBER_LAST_NAME";
import ACTION_ADMIN_STAFF_MEMBER_LAST_NAME_RESET from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberLastName/ACTION_ADMIN_STAFF_MEMBER_LAST_NAME_RESET";
import ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberFirstName/ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME";
import ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME_RESET from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberFirstName/ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME_RESET";
import ACTION_ADMIN_STAFF_MEMBER_ROLES from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberRoles/ACTION_ADMIN_STAFF_MEMBER_ROLES";
import ACTION_ADMIN_STAFF_MEMBER_ROLES_RESET from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberRoles/ACTION_ADMIN_STAFF_MEMBER_ROLES_RESET";
import ACTION_LOADING_SPINNER_RESET from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import "react-dropdown/style.css";
import "react-day-picker/lib/style.css";
import "./AdminService.css";

const AdminAddService = (props) => {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const otherRoleRef = useRef(null);

  const {
    data: getEmployeesData,
    loading: getEmployeesLoading,
    error: getEmployeesError,
    refetch: getEmployeesRefetch1,
  } = useQuery(getEmployeesQuery, {
    fetchPolicy: "no-cache",
  });

  const {
    addStaffMemberClicked,
    changeAddStaffMemberClicked,
    getEmployeesRefetch,
  } = props;

  const {
    data: getEmployee,
    refetch: getServiceRefetch,
    loading: getServiceLoading,
  } = useQuery(getServiceQuery, {
    fetchPolicy: "no-cache",
  });

  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );

  const [otherRoles, changeOtherRoles] = useState([]);
  const [firstFocus, changeFirstFocus] = useState(false);

  // Errors
  const [nameError, changeNameError] = useState(false);
  const [priceError, changePriceError] = useState(false);
  const [durationError, changeDurationError] = useState(false);
  const [descriptionError, changeDescriptionError] = useState(false);
  const [categoryError, changeCategoryError] = useState(false);
  const [imgError, changeImgError] = useState(false);
  const [emplError, changeEmpError] = useState(false);


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");

  const [employee, setEmployee] = useState([]);
const handleEmployee =(e)=>{
  setEmployee(e)
  console.log(employee, "sdji")
}
  const renderEstheticianNames = () => {
    if (getEmployeesData) {
      if (getEmployeesData.employees) {
        const filteredEmployeesArr = getEmployeesData.employees.filter((x) => {
          return x.employeeRole.includes("Esthetician");
        });

        return filteredEmployeesArr.map((x, i) => {
          return (
            <option
              key={i}
              value={
                x.firstName[0].toUpperCase() +
                x.firstName.slice(1).toLowerCase() +
                " " +
                x.lastName[0].toUpperCase() +
                x.lastName.slice(1).toLowerCase()
              }
            >
              {x.firstName[0].toUpperCase() +
                x.firstName.slice(1).toLowerCase() +
                " " +
                x.lastName[0].toUpperCase() +
                "."}
            </option>
          );
        });
      }
    }
  };

  const formData = new FormData();
// formData.append('name', name);
// formData.append('category', category);
// formData.append('description', description);
// formData.append('price', price);
// formData.append('duration', duration);
formData.append("img", img);
  const [
    addEmployee,
    { loading: addEmployeeLoading, data: addEmployeeData },
  ] = useMutation(addEmployeeMutation);
  const [addService, { loading, error }] = useMutation(addServiceMutation, {
    variables: {
      name: name,
      category: category,
      description: description,
      price: parseInt(price),
      duration: parseInt(duration),
      img: img||undefined,
      employees:employee,
    },
    // variables:formData,
    onCompleted: (data) => {
      console.log(data, "data");
      // perform any data processing here
      console.log(data, "data");
    },
  });
  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  useEffect(() => {
    if (addEmployeeData && !loadingSpinnerActive) {
      changeAddStaffMemberClicked(false);
      getEmployeesRefetch();
    }
  }, [
    addEmployeeData,
    loadingSpinnerActive,
    changeAddStaffMemberClicked,
    getEmployeesRefetch,
  ]);

  useEffect(() => {
    if (addEmployeeLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    }
  }, [addEmployeeLoading, dispatch]);

  useEffect(() => {
    if (addEmployeeData) {
      if (loadingSpinnerActive) {
        dispatch(ACTION_LOADING_SPINNER_RESET());
      }
    }
  }, [addEmployeeData, loadingSpinnerActive, dispatch]);

  useEffect(() => {
    const refInterval = setInterval(() => {
      if (otherRoleRef) {
        if (otherRoleRef.current && firstFocus) {
          const currentRef = otherRoleRef.current;

          changeFirstFocus(false);
          currentRef.focus();
        }
      }
    }, 500);

    return () => {
      clearInterval(refInterval);
    };
  }, [firstFocus]);

  const handleBackToAllStaff = () => {
    navigate.go(0);

    changeAddStaffMemberClicked(false);
    changeOtherRoles([]);
    // navigate.go()
    // dispatch(ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME_RESET());
    // dispatch(ACTION_ADMIN_STAFF_MEMBER_LAST_NAME_RESET());
    // dispatch(ACTION_ADMIN_STAFF_MEMBER_EMAIL_RESET());
    // dispatch(ACTION_ADMIN_STAFF_MEMBER_PHONE_NUMBER_RESET());
    // dispatch(ACTION_ADMIN_STAFF_MEMBER_ROLES_RESET());
  };

  const resetAllErrorStates = () => {
    if (nameError) {
      changeNameError(false);
    }

    if (priceError) {
      changePriceError(false);
    }

    if (durationError) {
      changeDurationError(false);
    }

    if (descriptionError) {
      changeDescriptionError(false);
    }

    if (categoryError) {
      changeCategoryError(false);
    }

    if (emplError) {
      changeEmpError(false);
    }
  };
  

  const handleSubmit = async () => {

    console.log(img, "img");
    if (name && price && duration && description && category && img && employee) {
      try {
        const f = await addService();
        console.log(f, "response");
        changeAddStaffMemberClicked(false);
        navigate.go(0);
      } catch (error) {
        console.log(error, "error");
      }
    }  else {
      if (!name) {
        changeNameError(true);
      }

      if (!price) {
        changePriceError(true);
      }

      if (!duration) {
        changeDurationError(true);
      } 
        
      if (!description) {
        changeDescriptionError(true);
      }
   
      if (!category) {
        changeCategoryError(true);
      }
      if (!img) {
        changeImgError(true);
      }
      if (!employee) {
        changeEmpError(true);
      }
    }
  };

  return (
    <Transition
      items={addStaffMemberClicked}
      from={{ transform: "translateX(-100%)" }}
      enter={{ transform: "translateX(0%)" }}
      leave={{ transform: "translateX(-100%)" }}
      config={{ duration: 200 }}
    >
      {(createAppointmentClicked) =>
        createAppointmentClicked &&
        ((styleprops) => (
          <div
            className="admin_individual_selected_client_container"
            style={{
              ...styleprops,
              zIndex: logoutClicked || loadingSpinnerActive ? 0 : 5,
            }}
          >
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
              <div className="admin_individual_selected_client_back_container">
                <FontAwesomeIcon
                  icon={faLongArrowAltLeft}
                  className="admin_individual_selected_client_back_arrow_icon"
                  onClick={handleBackToAllStaff}
                />
                <p onClick={handleBackToAllStaff}>Torna indietro</p>
              </div>
              <div className="admin_create_appointment_section_header">
                <h2>Add Service Information</h2>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Name
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: nameError ? "3px solid red" : "none",
                    zIndex: nameError ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    // value={adminStaffMemberFirstName}
                    // onChange={(e) => {
                    //   resetAllErrorStates();
                    //   dispatch(
                    //     ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME(e.target.value)
                    //   );
                    // }}
                    onChange={(e) => {
                      resetAllErrorStates();
                      setName(e.target.value);
                    }}
                    placeholder="Nome"
                  />
                </div>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Price
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: priceError ? "3px solid red" : "none",
                    zIndex: priceError ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    placeholder="Price"
                    // value={adminStaffMemberEmail}
                    maxLength={100}
                    // onChange={(e) => {
                    //   resetAllErrorStates();
                    //   dispatch(ACTION_ADMIN_STAFF_MEMBER_EMAIL(e.target.value));
                    // }}
                    onChange={(e) => {
                      resetAllErrorStates();
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Durata
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: durationError ? "3px solid red" : "none",
                    zIndex: durationError ? 99999 : "auto",
                  }}
                >
                  <select
                      value={duration}
                      onChange={(e) => {
                        resetAllErrorStates();
                        setDuration(e.target.value);
                      }}
                      aria-controls="react-autowhatever-1"
                      className="react-autosuggest__input"
                    >
                      <option disabled value="">Seleziona durata</option>
                      <option value="15">15 minuti</option>
                      <option value="30">30 minuti</option>
                      <option value="45">45 minuti</option>
                      <option value="60">60 minuti</option>
                      <option value="75">75 minuti</option>
                      <option value="90">90 minuti</option>
                    </select>
                </div>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Category
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: categoryError ? "3px solid red" : "none",
                    zIndex: categoryError ? 99999 : "auto",
                  }}
                >
                  <select
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    // value={adminStaffMemberFirstName}
                    // onChange={(e) => {
                    //   resetAllErrorStates();
                    //   dispatch(
                    //     ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME(e.target.value)
                    //   );
                    // }}
                    onChange={(e) => {resetAllErrorStates(); setCategory(e.target.value)}}
                  >
                    <option disabled value="">Seleziona una categoria</option>
                    <option value="opzione1">Opzione 1</option>
                    <option value="opzione2">Opzione 2</option>
                    <option value="opzione3">Opzione 3</option>
                  </select>

                </div>
              </div>{" "}
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Description
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: descriptionError ? "3px solid red" : "none",
                    zIndex: descriptionError ? 99999 : "auto",
                  }}
                >
                  <textarea
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    // value={adminStaffMemberFirstName}
                    // onChange={(e) => {
                    //   resetAllErrorStates();
                    //   dispatch(
                    //     ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME(e.target.value)
                    //   );
                    // }}
                    placeholder="Description"
                    onChange={(e) => {resetAllErrorStates();setDescription(e.target.value)}}
                  />
                </div>

                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Image
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: imgError ? "3px solid red" : "none",
                    zIndex: imgError ? 99999 : "auto",
                  }}
                >
                  <input
                    type="file"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    // value={adminStaffMemberFirstName}
                    // onChange={(e) => {
                    //   resetAllErrorStates();
                    //   dispatch(
                    //     ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME(e.target.value)
                    //   );
                    // }}
                    onChange={(e) => setImg(e.target.files[0])}
                    placeholder="Image"
                  />
                </div>
              </div>
              <div className="esthetician_preference_dropdown_input_field">
                <FontAwesomeIcon
                  className="esthetician_preference_dropdown_icon"
                  icon={faChevronCircleDown}
                />
                  <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: emplError ? "3px solid red" : "none",
                    zIndex: emplError ? 99999 : "auto",
                  }}
                >
                <Select
                  className="esthetician_preference_input"
                  mode="multiple"
                  name="select"
                  // multiple
                  // defaultValue={selectedEsthetician}
                  placeholder="No preference"
                  id="esthetician_preference"
                  // onChange={(e) => {
                  //   props.resetAllCartStatesExceptTreatments();
                  //   if (e.target.value === "No preference") {
                  //     dispatch(ACTION_SELECTED_ESTHETICIAN_RESET());
                  //   } else {
                  //     dispatch(ACTION_SELECTED_ESTHETICIAN(e.target.value));
                  //   }
                  // }}
                  onChange={handleEmployee}
                >
                  {/* <option>Nessuna preferenza</option> */}

                  {renderEstheticianNames()}
                </Select>
               </div>
              </div>
              <div className="admin_square_payment_form_container">
                <div className="sq-payment-form">
                  <div className="sq-creditcard" onClick={handleSubmit}>
                Add Service
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </Transition>
  );
};

export default AdminAddService;
