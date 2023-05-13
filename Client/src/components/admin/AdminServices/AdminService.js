import React, { useEffect, useState, useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faSearch,
  faEdit,
  faTrash,
  faUserEdit,
  faEllipsisH,
  faLongArrowAltLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {  gql } from '@apollo/client';
import { useSelector, useDispatch } from "react-redux";
import AdminUpdateService from "./AdminUpdateService";
import {useHistory} from "react-router-dom"
import { Redirect, Link, useLocation } from "react-router-dom";
import { FormGroup, Input } from "reactstrap";
import Modal from "react-modal";
import { Transition } from "react-spring/renderprops";
import imageCompression from "browser-image-compression";
import ImageUploader from "react-images-upload";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";
import { useMutation,useQuery } from "@apollo/react-hooks";
import deleteServiceMutation from "../../../graphql/mutations/deleteServiceMutation";
import getServiceQuery from "../../../graphql/queries/getServiceQuery"
import updateServiceMutation from "../../../graphql/mutations/updateServiceMutation";


import updateAdminProfilePictureMutation from "../../../graphql/mutations/updateAdminProfilePictureMutation";
import LZString from "lz-string";
import { css } from "@emotion/css";
import AdminAddService from "./AdminAddService";
import BounceLoader from "react-spinners/BounceLoader";
import AdminStaffIndividualProfile from "../AdminStaff/AdminStaffIndividualProfile";
import AdminAddStaffMember from "../AdminStaff/AdminAddStaffMember";
import AdminRenderUpcomingAppointments from "../AdminClients/AdminRenderUpcomingAppointments";
import AdminRenderPastAppointments from "../AdminClients/AdminRenderPastAppointments";
import moment from "moment";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_LOGIN_IS_NOT_ACTIVE from "../../../actions/Login/ACTION_LOGIN_IS_NOT_ACTIVE";
import ACTION_ADMIN_CLIENT_PROFILE_SELECTED from "../../../actions/Admin/AdminLogin/AdminClientSectionSelected/ACTION_ADMIN_CLIENT_PROFILE_SELECTED.js";
import ACTION_ADD_PROFILE_PHOTO_CLICKED_RESET from "../../../actions/Admin/AddProfilePhotoClicked/ACTION_ADD_PROFILE_CLICKED_RESET";
import ACTION_LOADING_SPINNER_RESET from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_IMAGE_LOADING from "../../../actions/Admin/ImageLoading/ACTION_IMAGE_LOADING";
import ACTION_IMAGE_LOADING_RESET from "../../../actions/Admin/ImageLoading/ACTION_IMAGE_LOADING_RESET";
import ACTION_ON_ACTIVITY_PAGE_RESET from "../../../actions/Admin/OnActivityPage/ACTION_ON_ACTIVITY_PAGE_RESET";
import "./AdminService.css";
import "react-html5-camera-photo/build/css/index.css";

const AdminService = (props) => {

// console.log(getServiceData1, "hhh")S
  const navigate = useHistory();
  const [ServiceID, setId ] = useState()
  const {
    getEmployeeData,
    getEmployeeError,
    getEmployeesError,
    getEmployeesRefetch,
    
    getAllAppointmentsData,
    currentScreenSize,
    initialScreenSize,
    getClientsData,
    getClientsLoading,
    getAllAppointmentsRefetch,
    employeeDataRefetch,
    randomColorArray,
    resetNotifications,
  } = props;

  const dispatch = useDispatch();
  const location = useLocation();

  const selectedEmployeeBackRef = useRef(null);
  const backToClientsRef = useRef(null);
  let individualEmployeeRef = useRef(null);

  const splashScreenHalfway = useSelector(
    (state) => state.splashScreenHalfway.splashScreenHalfway
  );
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const loginIsActive = useSelector(
    (state) => state.loginIsActive.login_is_active
  );
  const adminClientSectionSelected = useSelector(
    (state) => state.adminClientSectionSelected.admin_client_section_selected
  );
  const addProfilePhotoClicked = useSelector(
    (state) => state.addProfilePhotoClicked.add_profile_photo_clicked
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );
  const imageLoading = useSelector((state) => state.imageLoading.image_loading);
  const cancelAppointmentClicked = useSelector(
    (state) => state.cancelAppointmentClicked.cancelAppointmentClicked
  );
  const onActivityPage = useSelector(
    (state) => state.onActivityPage.on_activity_page
  );
  const adminNotifications = useSelector(
    (state) => state.adminNotifications.notifications
  );

  const [filteredAllEmployees, changeFilteredAllEmployees] = useState([]);
  const [employeeFilter, changeEmployeeFilter] = useState("");
  const [employeeToggled, changeEmployeeToggled] = useState("");
  const [employeeNameToggled, changeEmployeeNameToggled] = useState("");
  const [addStaffMemberClicked, changeAddStaffMemberClicked] = useState(false);
  const [updateServiceClicked, changeupdateServiceClicked] = useState(false);

  const imageUrl = `http://localhost:4000/uploads/`;


  const [takeAPhotoSelected, changeTakeAPhotoSelected] = useState(false);
  const [webcamURI, changeWebcamURI] = useState("");
  const [imageUploaded, changeImageUploaded] = useState("");
  const [imagePreviewAvailable, changeImagePreviewAvailable] = useState(false);
  const [pdfLoading, changePDFLoading] = useState(false);

  const [
    updateAdminProfilePicture,
    { data: updateAdminProfilePictureData },
  ] = useMutation(updateAdminProfilePictureMutation);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  useEffect(() => {
    if (!splashScreenComplete) {
      dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
    }
    if (!splashScreenHalfway) {
      dispatch(ACTION_SPLASH_SCREEN_HALFWAY());
    }
  }, [dispatch, splashScreenComplete, splashScreenHalfway]);

  const redirectToAdminLogInPage = () => {
    if (!adminAuthenticated) {
      return <Redirect to="/admin" />;
    }
  };
  useEffect(() => {
    // if (location.pathname || addProfilePhotoClicked || loadingSpinnerActive) {
    // window.scrollTo(0, 0);
    // }
  }, [location.pathname, addProfilePhotoClicked, loadingSpinnerActive]);

  const handleChangeEmployeeFilter = (e) => {
    changeEmployeeFilter(e.currentTarget.value);
  };

  useEffect(() => {
    if (onActivityPage) {
      if (adminNotifications) {
        if (adminNotifications.length > 0) {
          if (adminNotifications.some((item) => item.new)) {
            resetNotifications();
          }
        }
      }
      dispatch(ACTION_ON_ACTIVITY_PAGE_RESET());
    }
  }, [onActivityPage, dispatch, resetNotifications, adminNotifications]);
 
  const [deleteService, { loading, data }] = useMutation(
    deleteServiceMutation
  );
  const [updateService, { loading1, data1 }] = useMutation(
    updateServiceMutation
  );
  const handleDeleteService = (service) => {
    deleteService({
      variables: { _id: service },
    });
    navigate.go(0)
    //     const selectedEmployee = getEmployeesData.services.filter(
//       (x) => x._id !== service
//     );


}

const handleUpdateService = (service) => 
{
  changeupdateServiceClicked(true)
  setId(service)
  // updateService({
  //   variables: { _id: service },
  // });
  // navigate.go(0)
  //     const selectedEmployee = getEmployeesData.services.filter(
//       (x) => x._id !== service
//     );


}
useEffect(()=>{
  // navigate.go(0)

},[addStaffMemberClicked])
const add =()=>{
  changeAddStaffMemberClicked(true)
  alert(addStaffMemberClicked)
}

  useEffect(() => {
    if (employeeToggled) {
      if (getEmployeesData) {
        if (getEmployeesData.services.length > 0) {
          const selectedEmployee = getEmployeesData.services.filter(
            (x) => x._id === employeeToggled
          )[0];

          if (!employeeNameToggled) {
            changeEmployeeNameToggled(
              selectedEmployee.name + " " + selectedEmployee.name
            );
          }
        }
      }
    } else {
      if (employeeNameToggled) {
        changeEmployeeNameToggled("");
      }
    }
  }, [employeeToggled, employeeNameToggled, getEmployeesData]);
  const {
    data: getEmployeesData,
    refetch: getServiceRefetch,
    loading: getServiceLoading,
  } = useQuery(getServiceQuery, {
    fetchPolicy: "no-cache",
  });
  // useEffect(() => {
  //   if (employeeNameToggled) {
  //     changeSelectedEmployeeAppointments({
  //       own_appointments: getAllAppointmentsData.all_appointments.filter(
  //         (x) =>
  //           x.esthetician === employeeNameToggled &&
  //           moment(
  //             x.date + " " + x.startTime + " " + x.morningOrEvening,
  //             "MMMM D, YYYY h:mm A"
  //           ).isAfter(moment())
  //       ),
  //     });

  //     changeSelectedEmployeePastAppointments({
  //       own_past_appointments: getAllAppointmentsData.all_appointments.filter(
  //         (x) =>
  //           x.esthetician === employeeNameToggled &&
  //           moment(
  //             x.date + " " + x.startTime + " " + x.morningOrEvening,
  //             "MMMM D, YYYY h:mm A"
  //           ).isBefore(moment())
  //       ),
  //     });
  //   } else {
  //     changeSelectedEmployeeAppointments([]);
  //   }
  // }, [employeeNameToggled, getAllAppointmentsData]);

  const handleDeletedPreviewImage = () => {
    const deleteImageClass = document.getElementsByClassName("deleteImage");
    const uploadPictureClass = document.getElementsByClassName("uploadPicture");

    if (deleteImageClass) {
      if (deleteImageClass[0]) {
        deleteImageClass[0].style.display = "none";
      }
    }
    if (uploadPictureClass) {
      if (uploadPictureClass[0]) {
        uploadPictureClass[0].style.display = "none";
      }
    }
  };

  const handleImageUploaded = async (picture) => {
    dispatch(ACTION_IMAGE_LOADING());
    if (picture[0] || typeof picture === "string") {
      const reader = new FileReader();
      changeImagePreviewAvailable(true);
      try {
        let compressedImage;

        if (typeof picture === "object") {
          compressedImage = await imageCompression(picture[0], {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 300,
          });
        } else if (typeof picture === "string") {
          await fetch(picture)
            .then((res) => {
              return res.blob();
            })
            .then(async (blob) => {
              compressedImage = await imageCompression(blob, {
                maxSizeMB: 0.3,
                maxWidthOrHeight: 300,
              });
            });
        }

        reader.readAsDataURL(compressedImage);

        reader.onloadend = async () => {
          const base64data = reader.result;

          const compressedBase64data = LZString.compressToEncodedURIComponent(
            base64data
          );
          dispatch(ACTION_IMAGE_LOADING_RESET());
          changeImageUploaded(compressedBase64data);
        };
      } catch (error) {
        dispatch(ACTION_IMAGE_LOADING_RESET());
        console.log(error);
      }
    } else {
      dispatch(ACTION_IMAGE_LOADING_RESET());
      changeImageUploaded("");
      changeImagePreviewAvailable(false);
      handleDeletedPreviewImage();
    }
  };

  const preventKeys = (e) => {
    if (
      e.key === ")" ||
      e.key === "(" ||
      e.key === "[" ||
      e.key === "]" ||
      e.key === "\\" ||
      e.key === "/"
    ) {
      e.preventDefault();
    }
  };

  useMemo(() => {
    if (getEmployeesData) {
      if (getEmployeesData.services.length > 0) {
        if (changeEmployeeFilter) {
          changeFilteredAllEmployees(
            [...getEmployeesData.services].filter((x) => {
              const nameStartsWith = x.name.toLowerCase().startsWith(employeeFilter.toLowerCase());
              const categoryMatches = new RegExp(`^${employeeFilter}`, "gi").test(x.category);
  
              return (nameStartsWith || categoryMatches);
            })
          );
        }
      }
    }
  }, [employeeFilter, getEmployeesData]);

  // Allows click only if selected employee modal is not active
  // console.log(getEmployeeData?.services,"da")

  const handleEmployeeToggled = (e, item) => {
    if (e.currentTarget && individualEmployeeRef) {
      if (individualEmployeeRef.current) {
        if (
          individualEmployeeRef.current.className === e.currentTarget.className
        ) {
          if (selectedEmployeeBackRef) {
            if (!selectedEmployeeBackRef.current) {
              if (item) {
                if (item._id) {
                  changeEmployeeToggled(item._id);
                }
              }
            }
          }
        }
      } else {
        if (
          e.currentTarget.innerText.includes(
            item.name[0].toUpperCase() + item.name.slice(1).toLowerCase()
          ) &&
          e.currentTarget.innerText.includes(
            item.name[0].toUpperCase() + item.name.slice(1).toLowerCase()
          )
        ) {
          if (selectedEmployeeBackRef) {
            if (!selectedEmployeeBackRef.current) {
              if (item) {
                if (item._id) {
                  changeEmployeeToggled(item._id);
                }
              }
            }
          }
        }
      }
    }
  };

  // Function for back arrow click to reset selected toggled employee

  const handleEmployeeUntoggled = (e) => {
    if (
      (e.currentTarget && selectedEmployeeBackRef) ||
      (e.currentTarget && backToClientsRef)
    ) {
      if (selectedEmployeeBackRef.current || backToClientsRef.current) {
        if (
          selectedEmployeeBackRef.current.className ===
            e.currentTarget.className ||
          backToClientsRef.current.className === e.currentTarget.className
        ) {
          changeEmployeeToggled("");

          if (pdfLoading) {
            changePDFLoading(false);
          }
        }
      }
    }
  };

  // useEffect(() => {
  //   if (location.pathname || addProfilePhotoClicked || loadingSpinnerActive) {
  //     window.scrollTo(0, 0);
  //   }
  // }, [location.pathname, addProfilePhotoClicked, loadingSpinnerActive]);

  // When account screen unmounts, allow navbar
  useEffect(() => {
    if (loginIsActive) {
      dispatch(ACTION_LOGIN_IS_NOT_ACTIVE());
    }
  }, [dispatch, loginIsActive]);

  const handleConfirmPhotoSubmit = () => {
    updateAdminProfilePicture({
      variables: {
        id: employeeToggled,
        profilePicture: imageUploaded,
      },
    });

    dispatch(ACTION_IMAGE_LOADING());
    changeImageUploaded("");
    dispatch(ACTION_ADD_PROFILE_PHOTO_CLICKED_RESET());
    changeImagePreviewAvailable(false);
    changeTakeAPhotoSelected(false);
    changeWebcamURI("");
  };

  const handleProfilePictureRender = (item) => {
    if (item.profilePicture) {
      return (
        <img
          className="admin_individual_client_picture_profile_avatar"
          src={LZString.decompressFromEncodedURIComponent(item.profilePicture)}
          alt={
            item.name[0].toUpperCase() +
            item.name.slice(1).toLowerCase() +
            " " +
            item.name[0].toUpperCase() +
            item.name.slice(1).toLowerCase() +
            " Profile Picture"
          }
        />
      );
    } else {
      return (
        <div
          className="admin_individual_client_initials_profile_avatar"
          style={{
            background:
              randomColorArray[
                getEmployeesData.services.sort((a, b) =>
                  a.name.localeCompare(b.name)
                )
                // .map((x) => x.email)
                // .indexOf(item.email)
              ],
          }}
        >
          <p>{item.name[0].toUpperCase() + item.name[0].toUpperCase()}</p>
        </div>
      );
    }
  };

  useEffect(() => {
    if (updateAdminProfilePictureData) {
      const imageDataReceived = setTimeout(() => {
        if (imageLoading) {
          dispatch(ACTION_IMAGE_LOADING_RESET());
        }
      }, 500);
      getEmployeesRefetch();
      employeeDataRefetch();
      return () => {
        clearTimeout(imageDataReceived);
      };
    }
  }, [
    imageLoading,
    updateAdminProfilePictureData,
    dispatch,
    getEmployeesRefetch,
    employeeDataRefetch,
  ]);

  const renderBarInContactInfo = () => {
    if (!currentScreenSize) {
      if (initialScreenSize >= 1200) {
        return null;
      } else {
        return <p style={{ color: "rgb(200, 200, 200)" }}>|</p>;
      }
    } else {
      if (currentScreenSize >= 1200) {
        return null;
      } else {
        return <p style={{ color: "rgb(200, 200, 200)" }}>|</p>;
      }
    }
  };

  useEffect(() => {
    if (getClientsLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    } else {
      dispatch(ACTION_LOADING_SPINNER_RESET());
    }
  }, [dispatch, getClientsLoading]);

  useEffect(() => {
    if (getEmployeeError) {
      employeeDataRefetch();
    }
  }, [getEmployeeError, employeeDataRefetch]);

  useEffect(() => {
    if (getEmployeesError) {
      getEmployeesRefetch();
    }
  }, [getEmployeesError, getEmployeesRefetch]);
  const addServiceNEW = ()=>{
  changeAddStaffMemberClicked(true)
  console.log(addStaffMemberClicked)
  }
  return (

    <div className="admin_clients_container" style={{ overflow: "scroll" }}>
          {/* <img src={`${imageUrl}${img1}`} alt="Uploaded Image" /> */}

      {redirectToAdminLogInPage()}
      <Modal
        isOpen={imageLoading || loadingSpinnerActive || getClientsLoading}
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
          loading={imageLoading || loadingSpinnerActive || getClientsLoading}
        />
      </Modal>
      <div
        className="admin_clients_header"
        style={{
          zIndex:
            logoutClicked ||
            addProfilePhotoClicked ||
            loadingSpinnerActive ||
            imageLoading ||
            cancelAppointmentClicked ||
            getClientsLoading
              ? 0
              : 5,
          filter:
            cancelAppointmentClicked || getClientsLoading
              ? "blur(5px)"
              : "none",
        }}
      >
        <Link to="/admin/menu">
          <FontAwesomeIcon
            className="admin_clients_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>SERVIZI</h1>
      </div>
      <FormGroup>
        <div className="admin_clients_searchbar_container">
          <Input
            className="admin_clients_searchbar_input_field"
            placeholder="Filtra i servizi per nome o categoria"
            onChange={handleChangeEmployeeFilter}
            maxLength={128}
            onKeyDown={preventKeys}
          />
          <FontAwesomeIcon
            className="admin_clients_searchbar_icon"
            icon={faSearch}
          />
        </div> 
        <br />
        <br />
      </FormGroup>
      <div
        className="admin_clients_content_container"
        style={{ overflow: "scroll", marginTop: "2vh" }}
      >
        {getEmployeesData
          ? getEmployeesData.services.length > 0
            ? filteredAllEmployees
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item, i) => {
                  return (
                    <div
                      style={{ overflow: "scroll" }}
                      className="admin_individual_client_container"
                      key={i}
                      onClick={(e) => {
                        if (addStaffMemberClicked) {
                          return null;
                        } else {
                          handleEmployeeToggled(e, item);
                        }
                      }}
                      ref={individualEmployeeRef}
                    >
                    
                      <div
                        className="admin_individual_client_initials_square"
                        style={{
                          background: randomColorArray
                            ? randomColorArray[
                                getEmployeesData.services
                                  .sort((a, b) => a.name.localeCompare(b.name))
                                  .map((x) => x.name)
                                  .indexOf(item.name)
                              ]
                            : "rgb(0, 0, 0)",
                        }}
                      >
                        <p>
                        {/* <img src = {imageUrl+ 'Screenshot S2023-04-21 012341.png'}></img> */}
                        
                        </p>
                        <p>
                          {item.name[0].toUpperCase() +
                            item.name[0].toUpperCase()}
                        </p>
                      </div>
                      <div className="admin_individual_client_full_name">
                        <p>
                          {item.name[0].toUpperCase() +
                            item.name.slice(1).toLowerCase()
                          // " " +
                          // item.name[0].toUpperCase() +
                          // item.name.slice(1).toLowerCase()
                          }
                        </p>
                        {/* <p>
                          {item.employeeRole.length > 0
                            ? item.employeeRole.join(", ")
                            : null}
                        </p> */}
                        <p>{item.price ? item.price : null}</p>
                        <p>{item.duration ? item.duration : null}</p>
                        <p>{item.category ? item.category : null}</p>
                        {/* <p>{item.description ? item.description : null}</p> */}
                        {/* <p>{item._id}</p> */}
                       
                        <p onClick={() => handleDeleteService(item._id)}>
                          <FontAwesomeIcon
                            className="large_screen_side_menu_item_icon"
                            icon={faTrash}
                            style={{
                              color: "rgba(0, 129, 177, 0.9)",
                            }}
                          />
                       
                        </p>
                        <p>
                        <div onClick={() => handleUpdateService(item._id) }>
                          <FontAwesomeIcon
                            className="large_screen_side_menu_item_icon"
                            icon={faEdit}
                            style={{
                              color: "rgba(0, 129, 177, 0.9)",
                            }}
                          />
                        </div>
                        </p>
                      </div>
                      <span className="admin_individual_client_spacer" />
                    
                    
                    </div>
                  );
                })
            : null
          : null}
            {addStaffMemberClicked===true ? (
                        <AdminAddService
                          handleProfilePictureRender={
                            handleProfilePictureRender
                          }
                          renderBarInContactInfo={renderBarInContactInfo}
                          getClientsData={getClientsData}
                          getEmployeesRefetch={getEmployeesRefetch}
                          addStaffMemberClicked={addStaffMemberClicked}
                          changeAddStaffMemberClicked={
                            changeAddStaffMemberClicked
                          }
                        />
                      ) : null}
                        {updateServiceClicked ? (
                        <AdminUpdateService
                          handleProfilePictureRender={
                            handleProfilePictureRender
                          }
                          renderBarInContactInfo={renderBarInContactInfo}
                          getClientsData={getClientsData}
                          getEmployeesRefetch={getEmployeesRefetch}
                          addStaffMemberClicked={updateServiceClicked}
                          changeupdateServiceClicked={
                            changeupdateServiceClicked
                          }
                          ServiceID= {ServiceID}
                        />
                      ) : null}
                     
        <button
          className="add_staff_member_button"
          onClick={addServiceNEW}
        >
          AGGIUNGI UN SERVIZIO CHE IL CLIENTE PRENOTA
        </button>
  
      </div>
    </div>
  );
};

export default AdminService;
