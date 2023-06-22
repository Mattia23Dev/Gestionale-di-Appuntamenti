import React, { useEffect, useState, useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faUsers,
  faMoneyBill,
  faCalendarWeek,
  faBriefcase,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import {  gql } from '@apollo/client';
import { useSelector, useDispatch } from "react-redux";
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Chart from 'chart.js/dist/Chart.js';
import updateAdminProfilePictureMutation from "../../../graphql/mutations/updateAdminProfilePictureMutation";
import LZString from "lz-string";
import { css } from "@emotion/css";
import BounceLoader from "react-spinners/BounceLoader";
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
import "./AdminDashboard.css";
import "react-html5-camera-photo/build/css/index.css";

const AdminService = (props) => {

// console.log(getServiceData1, "hhh")S
  const navigate = useHistory();
  
  const [ServiceID, setId ] = useState()
  const {
    getEmployeesDataStaff,
    getEmployeeDataNow,
    getEmployeeData,
    getEmployeeError,
    getEmployeesError,
    getEmployeesRefetch,  
    getClientsData,
    getClientsLoading,
    employeeDataRefetch,
    resetNotifications,
    getAllAppointmentsData,
    getAllAppointmentsRefetch,
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

  const currentWeekIndexToday = moment().isoWeek() - 1;

  const [isFiltered, setIsFiltered] = useState(false);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(currentWeekIndexToday);
  const [currentWeekIndexNum, setCurrentWeekIndexNum] = useState(currentWeekIndexToday);
  const [chartData, setChartData] = useState(null);
  const [numberAppointments, setNumberAppointments] = useState();
  const [numberClients, setNumberClients] = useState();
  const [appsOver30Days, setAppsOver30Days] = useState([]);
  const [numberServices, setNumberServices] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalPriceRestart, setTotalPriceRestart] = useState();
  const [numberAppointmentsRestart, setNumberAppointmentsRestart] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adminDash, setAdminDash] = useState(false);
  const [takeAPhotoSelected, changeTakeAPhotoSelected] = useState(false);
  const [webcamURI, changeWebcamURI] = useState("");
  const [imageUploaded, changeImageUploaded] = useState("");
  const [imagePreviewAvailable, changeImagePreviewAvailable] = useState(false);
  const [pdfLoading, changePDFLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    const getAdmin = () => {
      if (getEmployeeDataNow && getEmployeeDataNow.employee && getEmployeeDataNow.employee.employeeRole.includes("Admin")) {
        setAdminDash(true);
      }
    };

    getAdmin();
  }, [getEmployeeDataNow]);

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

  useMemo(() => {
    if (getEmployeesData && getEmployeesData.services && getEmployeesData.services.length > 0) {
        const totalServices = getEmployeesData.services.length;
        setNumberServices(totalServices);
    }

    if (getClientsData && getClientsData.clients && getClientsData.clients.length > 0) {
        const totalClients = getClientsData.clients.length;
        setNumberClients(totalClients);
    }

    if (getAllAppointmentsData && getAllAppointmentsData.all_appointments && getAllAppointmentsData.all_appointments.length > 0) {
        const totalAppointment = getAllAppointmentsData.all_appointments.length;
        setNumberAppointments(totalAppointment);
        setNumberAppointmentsRestart(totalAppointment);
    }

    if (getEmployeesDataStaff && getEmployeesDataStaff.employees && getAllAppointmentsData && getAllAppointmentsData.all_appointments) {
      const employees = getEmployeesDataStaff.employees;
      const appointments = getAllAppointmentsData.all_appointments;
    
      employees.forEach((employee) => {
        const filteredAppointments = appointments.filter((appointment) => appointment.esthetician === employee.firstName + " " + employee.lastName);
    
        console.log(`Appointments for employee ${employee.firstName}:`, filteredAppointments);
      });
    }

    if (getAllAppointmentsData && getAllAppointmentsData.all_appointments.length > 0) {
        const totalPrices = getAllAppointmentsData.all_appointments.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price;
        }, 0);
        setTotalPrice(totalPrices);
        setTotalPriceRestart(totalPrices);
      }
    console.log(getAllAppointmentsData);

    if (getAllAppointmentsData && getAllAppointmentsData.all_appointments) {
      const appointments = getAllAppointmentsData.all_appointments;
    
      const filteredAppointments = appointments.filter((appointment) => {
        const thirtyDaysAgo = moment().subtract(31, 'days');
        
        // Verifica se il cliente ha effettuato altri appuntamenti successivi a 30 giorni fa
        const hasRecentAppointment = appointments.some((recentAppointment) =>
          recentAppointment.client === appointment.client && moment(recentAppointment.date) > thirtyDaysAgo
        );
    
        // Filtra solo gli appuntamenti con una data precedente a 30 giorni fa e senza appuntamenti più recenti
        return moment(appointment.date) <= thirtyDaysAgo && !hasRecentAppointment;
      });
    
      filteredAppointments.sort((a, b) => moment(b.date) - moment(a.date));
      console.log('Appointments made 30 or more days ago without recent appointments:', filteredAppointments);
      setAppsOver30Days(filteredAppointments);
    }
  }, [getEmployeesData, getAllAppointmentsData, getClientsData])

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleFilterClick = () => {

    if (isFiltered) {
      setStartDate(null);
      setEndDate(null);
      setIsFiltered(false);
      setTotalPrice(totalPriceRestart);
      setNumberAppointments(numberAppointmentsRestart);
    } else {
          if (startDate && endDate) {
            if (getAllAppointmentsData && getAllAppointmentsData.all_appointments.length > 0) {
              const filteredAppointments = getAllAppointmentsData.all_appointments.filter(appointment => {
                const appointmentDate = new Date(appointment.date);
                const formattedDate = appointmentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                const appointmentTimestamp = new Date(formattedDate).getTime();
                return appointmentTimestamp >= startDate.getTime() && appointmentTimestamp <= endDate.getTime();
              });

              setNumberAppointments(filteredAppointments.length);
        
              const totalPrices = filteredAppointments.reduce((accumulator, currentValue) => {
                const price = parseFloat(currentValue.price);
                return accumulator + price;
              }, 0);
        
              setIsFiltered(true);
              console.log('Totale prezzi appuntamenti nel periodo selezionato: ' + totalPrices);
              setTotalPrice(totalPrices);
            }
        }
    }

  };

const handleNextWeek = () => {
  setCurrentWeekIndex((prevIndex) => prevIndex + 1);
  setCurrentWeekIndexNum((prevIndex) => prevIndex + 1)
};

const handlePreviousWeek = () => {
  setCurrentWeekIndex((prevIndex) => prevIndex - 1);
  setCurrentWeekIndexNum((prevIndex) => prevIndex - 1)
};

const graphicStartDate = moment().startOf('year');
const graphicEndDate = moment().endOf('year');

const daysOfYear = [];
const currentDate = graphicStartDate.clone();

while (currentDate.isSameOrBefore(graphicEndDate)) {
  daysOfYear.push({
    date: currentDate.format('YYYY-MM-DD'),
    price: 0,
  });

  currentDate.add(1, 'day');
}

const daysInCurrentWeek = daysOfYear.slice(currentWeekIndex * 7, (currentWeekIndex + 1) * 7);
const daysInCurrentWeekNum = daysOfYear.slice(currentWeekIndexNum * 7, (currentWeekIndexNum + 1) * 7);

useEffect(() => {
  let filteredAppointments = [];
  const totalPricePerDay = {};

  if (selectedEmployee === "") {
    filteredAppointments = getAllAppointmentsData && getAllAppointmentsData.all_appointments ? getAllAppointmentsData.all_appointments : [];
  } else {
    if (getAllAppointmentsData && getAllAppointmentsData.all_appointments) {
      filteredAppointments = getAllAppointmentsData.all_appointments.filter(
        (appointment) => appointment.esthetician === selectedEmployee
      );
    }
  }

  if (filteredAppointments && filteredAppointments.length > 0) {
    filteredAppointments.forEach((appointment) => {
      const appointmentDate = moment(appointment.date).format('YYYY-MM-DD');
      if (totalPricePerDay[appointmentDate]) {
        totalPricePerDay[appointmentDate] += appointment.price;
      } else {
        totalPricePerDay[appointmentDate] = appointment.price;
      }
    });
  }

  // Calcola il prezzo totale degli appuntamenti per ogni giorno
 /* if (getAllAppointmentsData && getAllAppointmentsData.all_appointments.length > 0) {
    getAllAppointmentsData.all_appointments.forEach((appointment) => {
      const appointmentDate = moment(appointment.date).format('YYYY-MM-DD');
      if (totalPricePerDay[appointmentDate]) {
        totalPricePerDay[appointmentDate] += appointment.price;
      } else {
        totalPricePerDay[appointmentDate] = appointment.price;
      }
    });
  }*/

  // Aggiorna i prezzi totali degli appuntamenti nella settimana corrente
  const updatedDaysInCurrentWeek = daysInCurrentWeek.map((day) => {
    const price = totalPricePerDay[day.date] || 0;
    return {
      ...day,
      price: price,
    };
  });

  // Genera il grafico
  if (chartRef.current) {
    const chartElement = chartRef.current;
    const context = chartElement.getContext('2d');

    const maxPrice = Math.max(...updatedDaysInCurrentWeek.map((day) => day.price));

    const data = {
      labels: updatedDaysInCurrentWeek.map((day) => day.date),
      datasets: [
        {
          label: `Fatturato ${
            selectedEmployee ? `di ${selectedEmployee}` : "totale"
          }`,
          data: updatedDaysInCurrentWeek.map((day) => day.price),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    if (chart) {
      // Se il grafico esiste, aggiorna solo i dati
      chart.data = data;
      chart.update();
    } else {
      // Altrimenti, crea un nuovo grafico
      const newChart = new Chart(context, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true, // Imposta il valore minimo sull'asse Y a 0
              suggestedMax: maxPrice + 100, // Imposta il valore massimo sull'asse Y leggermente superiore al massimo prezzo
            },
          },
        },
      });

      setChart(newChart);
    }
  }
}, [chart, daysInCurrentWeek, getAllAppointmentsData]);

const handleEmployeeChange = (event) => {
  setSelectedEmployee(event.target.value);
  console.log(selectedEmployee);
};

useEffect(() => {
  let filteredAppointments = [];
  const totalAppointmentsPerDay = {};

  if (selectedEmployee === "") {
    filteredAppointments = getAllAppointmentsData && getAllAppointmentsData.all_appointments ? getAllAppointmentsData.all_appointments : [];
  } else {
    if (getAllAppointmentsData && getAllAppointmentsData.all_appointments) {
      filteredAppointments = getAllAppointmentsData.all_appointments.filter(
        (appointment) => appointment.esthetician === selectedEmployee
      );
    }
  }

  if (filteredAppointments && filteredAppointments.length > 0) {
    filteredAppointments.forEach((appointment) => {
      const appointmentDate = moment(appointment.date).format("YYYY-MM-DD");
      if (totalAppointmentsPerDay[appointmentDate]) {
        totalAppointmentsPerDay[appointmentDate]++;
      } else {
        totalAppointmentsPerDay[appointmentDate] = 1;
      }
    });
  }

  // Calcola il numero di appuntamenti per ogni giorno
   /*if (getAllAppointmentsData && getAllAppointmentsData.all_appointments.length > 0) {
    filteredAppointments.forEach((appointment) => {
      const appointmentDate = moment(appointment.date).format('YYYY-MM-DD');
      if (totalAppointmentsPerDay[appointmentDate]) {
        totalAppointmentsPerDay[appointmentDate]++;
      } else {
        totalAppointmentsPerDay[appointmentDate] = 1;
      }
    });
  }*/

  // Aggiorna il numero di appuntamenti nella settimana corrente
  const updatedDaysInCurrentWeek = daysInCurrentWeekNum.map((day) => {
    const count = totalAppointmentsPerDay[day.date] || 0;
    return {
      ...day,
      count: count,
    };
  });

  // Genera il grafico
  if (chartRefNum.current) {
    const chartElement = chartRefNum.current;
    const context = chartElement.getContext('2d');

    const maxCount = Math.max(...updatedDaysInCurrentWeek.map((day) => day.count));

    const data = {
      labels: updatedDaysInCurrentWeek.map((day) => day.date),
      datasets: [
        {
          label: `Numero di appuntamenti ${
            selectedEmployee ? `di ${selectedEmployee}` : "totali"
          }`,
          data: updatedDaysInCurrentWeek.map((day) => {
            const count = totalAppointmentsPerDay[day.date] || 0;
            return count;
          }),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    if (chartNum) {
      // Se il grafico esiste, aggiorna solo i dati
      chartNum.data = data;
      chartNum.update();
    } else {
      // Altrimenti, crea un nuovo grafico
      const newChart = new Chart(context, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true, 
              suggestedMax: maxCount + 30,
            },
          },
        },
      });

      setChartNum(newChart);
    }
  }
}, [chartNum, daysInCurrentWeekNum, getAllAppointmentsData]);

const chartRefNum = useRef(null);
const chartRef = useRef(null);
const [chart, setChart] = useState(null);
const [chartNum, setChartNum] = useState(null);



  return (

    <div className="admin_clients_container" style={{ overflow: "scroll" }}>

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
        <h1>DASHBOARD</h1>
      </div>
      {adminDash ? 
      <div className="dashboard-container">
        <div className="card-panoramica">
          <div className="card-panoramica-title">
            <h3>Dati generali</h3>
          </div>
          <div className="card-panoramica-analisi">
            <div>
                <FontAwesomeIcon
                  icon={faWallet}
                  size='3x'
                  color="white"
                />
                <h6>{totalPrice},00 €</h6>
                <p>Fatturato dagli appuntamenti</p>
            </div>
            <div>
              <FontAwesomeIcon
                  icon={faUsers}
                  size='3x'
                  color="white"
                />
                <h6>{numberClients}</h6>
                <p>Clienti totali</p>
            </div>
            <div>
              <FontAwesomeIcon
                  icon={faCalendarWeek}
                  size='3x'
                  color="white"
                />
                <h6>{numberAppointments}</h6>
                <p>Numero di appuntamenti</p>
            </div>
            <div>
              <FontAwesomeIcon
                  icon={faBriefcase}
                  size='3x'
                  color="white"
                />
                <h6>{numberServices}</h6>
                <p>Servizi offerti</p>
            </div>
          </div>
        </div>
          <div className="card-dashboard-chart">
          <select onChange={handleEmployeeChange} className="selectEmployee">
                <option value="">Tutti i dipendenti (scegli il dipendente)</option>
                    {getEmployeesDataStaff && getEmployeesDataStaff.employees.length > 0 ? (
                        getEmployeesDataStaff.employees.map((employee) => (
                          <option key={employee._id} value={`${employee.firstName} ${employee.lastName}`}>
                            {employee.firstName} {employee.lastName}
                          </option>
                        ))
                      ) : (
                        null
                      )}
          </select>
            <h2>Fatturato totale a settimana</h2>
                <button onClick={handlePreviousWeek}>Settimana precedente</button>
                <button onClick={handleNextWeek}>Settimana successiva</button>
                <canvas id="earningsChart" ref={chartRef}></canvas>
          </div>
          <div className="card-dashboard-chart">
          <h2>Clienti che non vengono da più di 1 mese</h2>
          <div className="appointment-table">
              <table className="table-dashboard">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Nome Cliente</th>
                    <th>Cognome Cliente</th>
                    <th>Servizio</th>
                  </tr>
                </thead>
                <tbody>
                  {appsOver30Days.length > 0 && appsOver30Days.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{moment(appointment.date).format('DD/MM/YYYY')}</td>
                      <td>{appointment.client.firstName}</td>
                      <td>{appointment.client.lastName}</td>
                      <td>{appointment.treatments[0].name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
          </div>
          <div className="dashboard-middle-container">
            <div className="card-dashboard">
              <h2>Filtra il fatturato e il numero di appuntamenti</h2>
              <div>
                  <div className="filter-date">
                      <h4>Da</h4>
                      <DatePicker selected={startDate} onChange={handleStartDateChange} className="custom-datepicker" placeholderText="Seleziona data di inizio" />
                      <h4>a</h4>
                      <DatePicker selected={endDate} onChange={handleEndDateChange} className="custom-datepicker" placeholderText="Seleziona data di fine" />
                      <button onClick={handleFilterClick}>
                        {isFiltered ? 'Rimuovi' : 'Filtra'}
                      </button>
                  </div>
              </div>           
              <h4>Hai un fatturato di <span>{totalPrice},00 €</span> da <span>{numberAppointments}</span> appuntamenti.</h4>
            </div>
          </div>

        </div> 
      :
        null
      }
      <div className="dashboard-container">
        <div className="card-dashboard-chart">
        <select onChange={handleEmployeeChange} className="selectEmployee">
              <option value="">Tutti i dipendenti (scegli il dipendente)</option>
                  {getEmployeesDataStaff && getEmployeesDataStaff.employees.length > 0 ? (
                      getEmployeesDataStaff.employees.map((employee) => (
                        <option key={employee._id} value={`${employee.firstName} ${employee.lastName}`}>
                          {employee.firstName} {employee.lastName}
                        </option>
                      ))
                    ) : (
                      null
                    )}
        </select>
          <h2>Numero di appuntamenti a settimana</h2>
              <button onClick={handlePreviousWeek}>Settimana precedente</button>
              <button onClick={handleNextWeek}>Settimana successiva</button>
              <canvas id="ChartNum" ref={chartRefNum}></canvas>
        </div>  

      </div>
      </div>
  );
};

export default AdminService;