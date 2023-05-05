import React, { useMemo, useRef } from "react";
import { Suspense } from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import { useMutation, useQuery } from "@apollo/react-hooks";
import getServiceQuery from "../../graphql/queries/getServiceQuery";

import { ToastContainer } from "react-toastify";
import ToastifyCSSImport from "./ToastifyCSSImport";
import "./AllTreatments.css";
import treatmentSuggestions from "../admin/AdminSchedule/AdminCreateAppointment/TreatmentSuggestions";

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
      <header className="all_treatments_header" ref={inViewRef}>
        {inView ? (
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
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                  }}
                  ref={treatmentsHeaderRef}
                >
                  I NOSTRI TRATTAMENTI
                </h2>
                <span
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                    width: treatmentsHeaderRef.current
                      ? treatmentsHeaderRef.current.clientWidth + "px"
                      : "0px",
                  }}
                  className="treatments_title_underline"
                />
                <br />
                <h3
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                  }}
                >
                  <p>
                    Ogni trattamento è <br />
                    personalizzato <br />
                    per i tuoi <br />
                    specifici bisogni.
                  </p>
                </h3>
              </>
            )}
          </Spring>
        ) : null}
      </header>

      <>
        <Suspense fallback={<></>}>
          {data
            ? data.services.map((d) => {
                return (
                  <Bacial
                    initialScreenSize={initialScreenSize}
                    currentScreenSize={currentScreenSize}
                    resetAllCartStates={resetAllCartStates}
                    data={d}
                  />
                );
              })
            : ""}
        </Suspense>
      </>

    </div>
  );
});

export default AllTreatments;
