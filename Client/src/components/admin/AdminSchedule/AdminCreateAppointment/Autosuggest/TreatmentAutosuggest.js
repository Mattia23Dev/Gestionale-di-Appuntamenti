import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { useDispatch, useSelector } from "react-redux";
import treatmentSuggestions from "../TreatmentSuggestions";
import ACTION_ADMIN_APPOINTMENT_DURATION from "../../../../../actions/Admin/AdminCreateAppointment/AdminAppointmentDuration/ACTION_ADMIN_APPOINTMENT_DURATION";
import ACTION_ADMIN_SELECTED_TREATMENTS from "../../../../../actions/Admin/AdminCreateAppointment/AdminSelectedTreatments/ACTION_ADMIN_SELECTED_TREATMENTS";
import getServiceQuery from "../../../../../graphql/queries/getServiceQuery"
import { useMutation,useQuery } from "@apollo/react-hooks";

const TreatmentAutosuggest = (props) => {
  const dispatch = useDispatch();
  const {
    data: getServiceData,
    refetch: getServiceRefetch,
    loading: getServiceLoading,
  } = useQuery(getServiceQuery, {
    fetchPolicy: "no-cache",
  });
  const [treatmentInputSuggestions, changeTreatmentInputSuggestions] = useState(
    []
  );
  const [treatmentInput, changeTreatmentInput] = useState("");

  const adminAppointmentDuration = useSelector(
    (state) => state.adminAppointmentDuration.admin_appointment_duration
  );
  const adminSelectedTreatments = useSelector(
    (state) => state.adminSelectedTreatments.admin_selected_treatments
  );

  const treatmentInputChange = (event, { newValue }) => {
    changeTreatmentInput(newValue);
  };

  const renderTreatmentSuggestion = (suggestion) => {
    return (
      <div className="admin_individual_client_treatment_suggestion_container">
        <p>{suggestion.props.children[0].props.children}</p>
        <p>
          {suggestion.props.children[3].props.children
            ?  suggestion.props.children[3].props.children + ",00 €"
            : null}
        </p>
      </div>
    );
  };

  const renderSectionTitle = (section) => {
    return (
      <span className="react_autosuggest_section_title_header">
        {section.sectionTitle}
      </span>
    );
  };

  const getSectionSuggestions = (section) => {
    if (section.suggestions) {
      return section.suggestions.map((x, i) => {
        return (
          <>
            <span key={i}>{x.name}</span>
            <span key={i}>{x.componentName}</span>
            <span key={i}>{x.duration}</span>
            <span key={i}>{x.price}</span>
            <span key={i}>{x.picture}</span>
          </>
        );
      });
    }
  };

  const onTreatmentSuggestionsFetchRequested = ({ value }) => {
    changeTreatmentInputSuggestions(getTreatmentSuggestions(value));
  };

  const onTreatmentSuggestionsClearRequested = () => {
    changeTreatmentInputSuggestions([]);
  };

  const treatmentInputProps = {
    placeholder: "Aggiungi servizio",
    value: treatmentInput,
    onChange: treatmentInputChange,
    style: { border: "none" },
  };

  const getTreatmentSuggestionValue = (suggestion) => {
    dispatch(
      ACTION_ADMIN_APPOINTMENT_DURATION(
        adminAppointmentDuration + suggestion.props.children[2].props.children
      )
    );
    dispatch(
      ACTION_ADMIN_SELECTED_TREATMENTS([...adminSelectedTreatments, suggestion])
    );

    return "";
  };
  const getTreatmentSuggestions = (value) => {
    console.log(treatmentSuggestions(getServiceData), "please")

    const inputValue = value ? value.trim().toLowerCase() : "";
    
    
    
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      const sortedArr = [];

      for (let i = 0; i < treatmentSuggestions(getServiceData).length; i++) {
        sortedArr.push({
          sectionTitle: treatmentSuggestions(getServiceData)
            ? treatmentSuggestions(getServiceData)[i].sectionTitle
              ? treatmentSuggestions(getServiceData)[i].sectionTitle
              : null
            : null,
          suggestions: treatmentSuggestions(getServiceData)
            ? treatmentSuggestions(getServiceData)[i].suggestions
              ? treatmentSuggestions(getServiceData)[i].suggestions.sort((a, b) =>
                  a.name ? a.name.localeCompare(b.name) : null
                )
              : null
            : null,
        });
      }
      console.log(sortedArr,"su")
      return sortedArr;
    } else {
      const sortedArr = [];
      const allTreatmentSuggestions = treatmentSuggestions(getServiceData);
      for (let i = 0; i < allTreatmentSuggestions.length; i++) {
        sortedArr.push({
          sectionTitle: allTreatmentSuggestions
            ? allTreatmentSuggestions[i].sectionTitle
              ? allTreatmentSuggestions[i].sectionTitle
              : null
            : null,
          suggestions: allTreatmentSuggestions
            ? allTreatmentSuggestions[i].suggestions
                .sort((a, b) => (a.name ? a.name.localeCompare(b.name) : null))
                .filter((x) => {
                  const treatmentName = x.name;

                  if (
                    treatmentName.toLowerCase().slice(0, inputLength) ===
                    inputValue
                  ) {
                    return (
                      treatmentName.toLowerCase().slice(0, inputLength) ===
                      inputValue
                    );
                  } else {
                    return null;
                  }
                })
            : null,
        });
        return sortedArr;
      }
    }
  };

  return (
    <div
      className="admin_create_appointment_input_information_container"
      style={{
        borderLeft: "1px solid rgb(211, 211, 211)",
      }}
    >
      <div
        role="combobox"
        aria-haspopup="listbox"
        aria-owns="react-autowhatever-1"
        aria-controls="react-autowhatever-1"
        aria-expanded="false"
        className="react-autosuggest__container react-autosuggest__container-select-service"
      >
        <Autosuggest
          suggestions={treatmentInputSuggestions}
          onSuggestionsFetchRequested={onTreatmentSuggestionsFetchRequested}
          onSuggestionsClearRequested={onTreatmentSuggestionsClearRequested}
          getSuggestionValue={getTreatmentSuggestionValue}
          renderSuggestion={renderTreatmentSuggestion}
          inputProps={treatmentInputProps}
          shouldRenderSuggestions={() => true}
          focusInputOnSuggestionClick={false}
          multiSection={true}
          renderSectionTitle={(section) => renderSectionTitle(section)}
          getSectionSuggestions={(section) => getSectionSuggestions(section)}
        />
      </div>

      <div
        role="combobox"
        aria-haspopup="listbox"
        aria-owns="react-autowhatever-1"
        aria-controls="react-autowhatever-1"
        aria-expanded="false"
        className="react-autosuggest__container"
      >
        <input
          type="text"
          disabled
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="react-autowhatever-1"
          className="react-autosuggest__input react-autosuggest__input-select-service"
          style={{
            borderLeft: "1px solid transparent",
            borderRight: "1px solid transparent",
          }}
        />
      </div>
      <div
        role="combobox"
        aria-haspopup="listbox"
        aria-owns="react-autowhatever-1"
        aria-controls="react-autowhatever-1"
        aria-expanded="false"
        className="react-autosuggest__container"
      >
        <input
          type="text"
          disabled
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="react-autowhatever-1"
          className="react-autosuggest__input react-autosuggest__input-select-service"
          style={{
            borderLeft: "1px solid transparent",
          }}
        />
      </div>
    </div>
  );
};

export default TreatmentAutosuggest;
