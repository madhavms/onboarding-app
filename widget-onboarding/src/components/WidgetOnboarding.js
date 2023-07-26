import { useState } from "react";
import styled from "styled-components";
import React from "react";
import WidgetDataForm from "./WidgetDataForm";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #cccccc;
  width: 300px;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SuccessMessage = styled.p`
  font-size: 18px;
  color: green;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: red;
  margin-top: 20px;
`;

function WidgetOnboardingPage() {
  const [remoteEntryUrl, setRemoteEntryUrl] = useState("");
  const [widget, setWidget] = useState("");
  const [scope, setScope] = useState("");
  const [label, setLabel] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const clearMessage = () => {  
    setSuccessMessage("");
    setErrorMessage("");
  };

  const resetForm = () => {
    setRemoteEntryUrl("");
    setWidget("");
    setScope("");
    setLabel("");
  };

   const handleSubmit = (widgetData, menuData) => {
    Promise.all([
      fetch(`${process.env.FIN_API_URL}/widgets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(widgetData),
      }),
      fetch(`${process.env.FIN_API_URL}/menu/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      }),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(([widgetResponse, menuResponse]) => {
        setSuccessMessage("Widget onboarded successfully!");
        resetForm();
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Widget onboarding failed. Please try again.");
        setSuccessMessage("");
      });

      return {successMessage, errorMessage}
  };

  return (
    <div>
      <h1>Widget Onboarding Page</h1>
      <WidgetDataForm onSubmit={handleSubmit} successMessage={successMessage} errorMessage={errorMessage} clearMessage={clearMessage}/>
    </div>
  );
}

export default WidgetOnboardingPage;
