import React, { useMemo, useRef, useState} from "react";
import { Suspense } from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import { useMutation, useQuery } from "@apollo/react-hooks";
import getServiceQuery from "../../graphql/queries/getServiceQuery";
import leftImage from '../../images/1478254271f24428b884916396971609accb25f958.jpg';
import { ToastContainer } from "react-toastify";
import ToastifyCSSImport from "./ToastifyCSSImport";
import "./AllTreatments.css";
import treatmentSuggestions from "../admin/AdminSchedule/AdminCreateAppointment/TreatmentSuggestions";
import getAllAppointmentsQuery from "../../graphql/queries/getAllAppointmentsQuery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faSpa, faBath, faFlask, faHandHoldingWater } from '@fortawesome/free-solid-svg-icons';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';


SwiperCore.use([Navigation, Pagination]);

const AllTreatments = React.forwardRef((props, ref) => {
  const {
    data,
    refetch: getServiceRefetch,
    loading: getServiceLoading,
  } = useQuery(getServiceQuery, {
    fetchPolicy: "no-cache",
  });
  console.log(data, "datas");
  const {
    data: getAllAppointmentsData,
    refetch: getAllAppointmentsRefetch,
  } = useQuery(getAllAppointmentsQuery, {
    fetchPolicy: "no-cache",
  });
  console.log(getAllAppointmentsData, "datas2");

  const {
    currentScreenSize,
    initialScreenSize,
    Treatments1Ref,
    resetAllCartStates,
    name,
  } = props;

  const treatmentsHeaderRef = useRef(null);

  const Bacial = useMemo(
    () => React.lazy(() => import("../treatments/Bacial/Bacial")),
    []
  );

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: initialScreenSize >= 1200 ? 0.7 : 0.2,
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  /*const filteredServices = selectedCategory
    ? data.services.filter((service) => service.category === selectedCategory)
    : data.services;*/

  return (
    <div className="all_treatments_container" id={name} ref={Treatments1Ref}>
      <ToastContainer
        toastClassName="toast_container"
        position={
          !currentScreenSize
            ? initialScreenSize >= 768
              ? !window.matchMedia("(orientation: landscape)").matches
                ? "bottom-center"
                : "bottom-right"
              : "bottom-right"
            : currentScreenSize >= 768
            ? !window.matchMedia("(orientation: landscape)").matches
              ? "bottom-center"
              : "bottom-right"
            : "bottom-right"
        }
        autoClose={3000}
        newestOnTop={false}
        hideProgressBar
        closeOnClick
        pauseOnVisibilityChange
        draggable={true}
        draggablePercent={20}
      />
      <header className="all_treatments_header">
          <Spring
            from={{
              position: "relative",
              opacity: 0,
            }}
            to={{
              position: "relative",
              opacity: 1,
            }}
            config={{ duration: 1000 }}
          >
            {(styles) => (
              <>
                <Suspense fallback={<></>}>
                  <ToastifyCSSImport />
                </Suspense>
                <h2
                >
                  CHI SIAMO
                </h2>
                <span
                  className="treatments_title_underline"
                />
                <br />
                  <p className="landing_page_description">
                    Da circa 10 anni ci occupiamo
                    del relax dei
                    nostri clienti
                  </p>
              </>
            )}
          </Spring>
              <div className="who-we-are">
                <div className="who-left">
                  <img alt="image-benessere" src={leftImage} />
                </div>
                <div className="who-right">
                  <div className="who-right-item">
                      <div className="who-right-item-card">
                          <FontAwesomeIcon icon={faFlask} size="3x" color="pink" />
                          <h4>Trattamenti di benessere</h4>
                          <p> 
                            Ogni trattamento è personalizzato per le tue esigenze, utilizzando tecniche tradizionali e innovative 
                            per sciogliere le tensioni e promuovere il fluire dell'energia vitale.</p>
                      </div>
                      <div className="who-right-item-card">
                          <FontAwesomeIcon icon={faSpa} size="3x" color="pink" />
                          <h4>Massaggi e terapie</h4>
                          <p>offriamo anche terapie specifiche che si concentrano sul ripristino dell'equilibrio interno. Attraverso approcci terapeutici mirati, 
                            ti aiuteremo a superare i disagi fisici e a ristabilire l'armonia nella tua vita.</p>
                      </div>
                  </div>
                  <div className="who-right-item">
                      <div className="who-right-item-card">
                          <FontAwesomeIcon icon={faBath} size="3x" color="pink" />
                          <h4>Cura della persona</h4>
                          <p>
                            Il nostro team di professionisti qualificati sarà al tuo fianco per consigliarti e guidarti lungo il percorso verso 
                            una salute migliore.</p>
                      </div>
                      <div className="who-right-item-card">
                          <FontAwesomeIcon icon={faHandHoldingWater} size="3x" color="pink" />
                          <h4>Prodotti naturali</h4>
                          <p>La nostra filosofia si basa sull'utilizzo di prodotti naturali, 
                            selezionati con cura per fornirti trattamenti delicati e rispettosi della tua pelle 
                            e del tuo benessere generale.</p>
                      </div>
                  </div>
                </div>
            </div>
      </header>


      <header className="all_treatments_header" ref={inViewRef}>
                <Suspense fallback={<></>}>
                  <ToastifyCSSImport />
                </Suspense>
                <h2
                  ref={treatmentsHeaderRef}
                >
                  I NOSTRI TRATTAMENTI
                </h2>
                <span
                  className="treatments_title_underline"
                />
                <br />
                <h3
                >
                  <p className="landing_page_description">
                    Ogni trattamento è
                    personalizzato
                    per i tuoi
                    specifici bisogni.
                  </p>
                </h3>
            <div className="button-filter-container">
              <button onClick={() => setSelectedCategory(null)} className={selectedCategory === null ? 'selected-button' : 'not-sel-butt'}>Guarda tutte</button>
              <button onClick={() => handleCategoryClick('opzione1')} className={selectedCategory === 'opzione1' ? 'selected-button' : 'not-sel-butt'}>Trattamenti Viso</button>
              <button onClick={() => handleCategoryClick('opzione2')} className={selectedCategory === 'opzione2' ? 'selected-button' : 'not-sel-butt'}>Mani e Piedi</button>
              <button onClick={() => handleCategoryClick('opzione3')} className={selectedCategory === 'opzione3' ? 'selected-button' : 'not-sel-butt'}>Depilazione donna</button>
              <button onClick={() => handleCategoryClick('opzione4')} className={selectedCategory === 'opzione4' ? 'selected-button' : 'not-sel-butt'}>Depilazione uomo</button>
              <button onClick={() => handleCategoryClick('opzione5')} className={selectedCategory === 'opzione5' ? 'selected-button' : 'not-sel-butt'}>Trattamenti corpo</button>
              <button onClick={() => handleCategoryClick('opzione6')} className={selectedCategory === 'opzione6' ? 'selected-button' : 'not-sel-butt'}>Epilazione Laser</button>
              <button onClick={() => handleCategoryClick('opzione7')} className={selectedCategory === 'opzione7' ? 'selected-button' : 'not-sel-butt'}>Pressoterapia</button>
            </div>
      </header>
      <div className="services-container">
      <Swiper
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={3}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >

      {data &&
        data.services ? (
          data.services
          .filter((service) => (selectedCategory ? service.category === selectedCategory : true))
          .map((d) => (
            <SwiperSlide key={d._id}>
              <Suspense fallback={<></>}>
               <Bacial
                  key={d._id}
                  initialScreenSize={initialScreenSize}
                  currentScreenSize={currentScreenSize}
                  resetAllCartStates={resetAllCartStates}
                  data={d}
                />
                </Suspense>
            </SwiperSlide>
          ))
        )
        : 
        (
          <>Loading...</>
        )
        }

    </Swiper>
      </div>

    </div>
  );
});

export default AllTreatments;
