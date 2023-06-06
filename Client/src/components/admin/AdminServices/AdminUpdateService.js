import React, { useEffect, useState, useRef } from "react";
import { Transition } from "react-spring/renderprops";
import { faLongArrowAltLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import Modal from "react-modal";
import { css } from "@emotion/css";
import {useHistory} from "react-router-dom"
import {Select} from 'antd'
import getEmployeesQuery from "../../../graphql/queries/getEmployeesQuery";
import getServiceQuery from "../../../graphql/queries/getServiceQuery"
import {
  faShoppingCart,
  faChevronLeft,
  faChevronRight,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import BounceLoader from "react-spinners/BounceLoader";
import { ApolloError } from 'apollo-client';

import updateServiceMutation from "../../../graphql/mutations/updateServiceMutation";
import addServiceMutation from "../../../graphql/mutations/addServiceMutaion";

import addEmployeeMutation from "../../../graphql/mutations/addEmployeeMutation";
import Dropdown from "react-dropdown";
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

const AdminUpdateService = (props) => {
  const dispatch = useDispatch();
const navigate = useHistory()
  const otherRoleRef = useRef(null);

  const {
    addStaffMemberClicked,
    changeupdateServiceClicked,
    getEmployeesRefetch,
    ServiceID
  } = props;

  const {
    data: getEmployeesData,
    loading: getEmployeesLoading,
    error: getEmployeesError,
    refetch: getEmployeesRefetch1,
  } = useQuery(getEmployeesQuery, {
    fetchPolicy: "no-cache",
  });
  
//   const adminStaffMemberFirstName = useSelector(
//     (state) => state.adminStaffMemberFirstName.admin_staff_member_first_name
//   );
//   const adminStaffMemberLastName = useSelector(
//     (state) => state.adminStaffMemberLastName.admin_staff_member_last_name
//   );
//   const adminStaffMemberEmail = useSelector(
//     (state) => state.adminStaffMemberEmail.admin_staff_member_email
//   );
//   const adminStaffMemberPhoneNumber = useSelector(
//     (state) => state.adminStaffMemberPhoneNumber.admin_staff_member_phone_number
//   );
//   const adminStaffMemberRoles = useSelector(
//     (state) => state.adminStaffMemberRoles.admin_staff_member_roles
//   );

  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );

  const [otherRoles, changeOtherRoles] = useState([]);
  const [firstFocus, changeFirstFocus] = useState(false);

  // Errors
  const [firstNameError, changeFirstNameError] = useState(false);
  const [lastNameError, changeLastNameError] = useState(false);
  const [emailError, changeEmailError] = useState(false);
  const [phoneNumberError, changePhoneNumberError] = useState(false);
  const [roleError, changeRoleError] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const [service, setService] = useState(null);
  const [employee, setEmployee] = useState([]);
const handleEmployee =(e)=>{
  setEmployee(e)
  console.log(e, "sdji")

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

  const {
    data: getServicesData,
    refetch: getServiceRefetch,
    loading: getServiceLoading,
  } = useQuery(getServiceQuery, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (getServicesData) {
  
      const filteredService = getServicesData && getServicesData.services.filter(service => {
        return service._id && service._id === ServiceID;
      });
  
      setService(filteredService[0]);
    }
  }, [getServicesData]);
  console.log(service)

  const [
    addEmployee,
    { loading: addEmployeeLoading, data: addEmployeeData },
  ] = useMutation(addEmployeeMutation);
  const [updateService, { loading, error }] = useMutation(updateServiceMutation,{

        variables: { _id:ServiceID,name: name ||undefined, 
            category: category||undefined,   
            description:description||undefined,     
            duration:parseInt(duration) ||undefined,
            price:parseInt(price) ||undefined,
            // category: category, description:description, 
         
           img:img ||undefined,
           employees:employee,
          },
        onCompleted: (data) => {
          console.log(data, "data");
          // perform any data processing here
          console.log(data, "data");
    
        }
  }
  );
  
  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;


  



  useEffect(() => {
    if (addEmployeeData && !loadingSpinnerActive) {
        changeupdateServiceClicked(false);
      getEmployeesRefetch();
    }
  }, [
    addEmployeeData,
    loadingSpinnerActive,
    changeupdateServiceClicked,
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
   // navigate.go(0)
   window.history.back();

    changeupdateServiceClicked(false);
    changeOtherRoles([]);
    // dispatch(ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME_RESET());
    // dispatch(ACTION_ADMIN_STAFF_MEMBER_LAST_NAME_RESET());
    // dispatch(ACTION_ADMIN_STAFF_MEMBER_EMAIL_RESET());
    // dispatch(ACTION_ADMIN_STAFF_MEMBER_PHONE_NUMBER_RESET());
    // dispatch(ACTION_ADMIN_STAFF_MEMBER_ROLES_RESET());

  };


  // const variablesModel = {
  //   firstName: adminStaffMemberFirstName,
  //   lastName: adminStaffMemberLastName,
  //   email: adminStaffMemberEmail,
  //   phoneNumber: adminStaffMemberPhoneNumber,
  //   employeeRole: adminStaffMemberRoles.concat(otherRolesValuesFiltered),
  // };
  


  const handleSubmit =async () => {
    console.log(img,"img")
    // if (
    //   adminStaffMemberFirstName &&
    //   adminStaffMemberLastName &&
    //   adminStaffMemberPhoneNumber &&
    //   adminStaffMemberEmail &&
    //   adminStaffMemberRoles.concat(otherRolesValuesFiltered).length > 0
    // ) {
   
    try {
      // your GraphQL query here
      console.log("sent", ServiceID)
      await updateService()
      navigate.go(0)

    changeupdateServiceClicked(false);
    } catch (error) {
      
        console.log('Errors', error);
      
    }

  // }
  // );
  
    // } else {
    //   if (!adminStaffMemberFirstName) {
    //     changeFirstNameError(true);
    //   }

    //   if (!adminStaffMemberLastName) {
    //     changeLastNameError(true);
    //   }

    //   if (!adminStaffMemberPhoneNumber) {
    //     changePhoneNumberError(true);
    //   } else {
    //     if (phone(adminStaffMemberPhoneNumber)[0]) {
    //       if (!isMobilePhone(phone(adminStaffMemberPhoneNumber)[0])) {
    //         changePhoneNumberError(true);
    //      }
    //     } else {
    //       changePhoneNumberError(true);
    //     }
    //   }

    //   if (!adminStaffMemberEmail) {
    //     changeEmailError(true);
    //   } else {
    //     if (!isEmail(adminStaffMemberEmail)) {
    //       changeEmailError(true);
    //     }
    //   }

    //   if (adminStaffMemberRoles.concat(otherRolesValuesFiltered).length < 1) {
    //     changeRoleError(true);
    //   }
    // }
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
                <h2>Modifica le informazioni di servizio</h2>
              </div>
              <div>
                <ul>
                  <li>Nome: {service && service.name}</li>
                  <li>Prezzo: {service && service.price},00 €</li>
                  <li>Durata: {service && service.duration} minuti</li>
                  <li>Categoria: {service && service.category}</li>
                  <li>Descrizione: {service && service.description}</li>
                  <li>Personale: {service && service.employees}</li>
                </ul>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Nome
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: firstNameError ? "3px solid red" : "none",
                    zIndex: firstNameError ? 99999 : "auto",
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
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="Nome"
                  />
                </div>
             
              
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Prezzo
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: emailError ? "3px solid red" : "none",
                    zIndex: emailError ? 99999 : "auto",
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
                    onChange={(e)=>setPrice(e.target.value)}

                  />
                </div>
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
              Durata
                </div>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
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

              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Categoria
                </div>
                    <div
                      role="combobox"
                      aria-haspopup="listbox"
                      aria-owns="react-autowhatever-1"
                      aria-controls="react-autowhatever-1"
                      aria-expanded="false"
                      className="react-autosuggest__container"
                      style={{
                        outline: firstNameError ? "3px solid red" : "none",
                        zIndex: firstNameError ? 99999 : "auto",
                      }}
                    >
                      <select
                        autoComplete="off"
                        aria-autocomplete="list"
                        aria-controls="react-autowhatever-1"
                        className="react-autosuggest__input"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value); }}
                      >
                          <option disabled value="">Seleziona una categoria</option>
                          <option value="opzione1">Opzione 1</option>
                          <option value="opzione2">Opzione 2</option>
                          <option value="opzione3">Opzione 3</option>
                      </select>
                    </div>
             
              
              </div>   <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Descrizione
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  // style={{
                  //   outline: nameError ? "3px solid red" : "none",
                  //   zIndex: nameError ? 99999 : "auto",
                  // }}
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
                    onChange={(e)=>setDescription(e.target.value)}

                  />
                </div>
             
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Immagine
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: firstNameError ? "3px solid red" : "none",
                    zIndex: firstNameError ? 99999 : "auto",
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
                    onChange={(e)=>setImg(e.target.files[0])}

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
                   Aggiorna servizio
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

export default AdminUpdateService;
