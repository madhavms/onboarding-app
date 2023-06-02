import { useState } from "react";
import styled from "styled-components";
import React from 'react';

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

  const resetForm = () => {
    setRemoteEntryUrl("");
    setWidget("");
    setScope("");
    setLabel("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const widgetData = { url: remoteEntryUrl, scope, widget  };
    const menuData = { widget, label };
  
    Promise.all([
      fetch(`${process.env.FIN_API_URL}/widgets/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(widgetData)
      }),
      fetch(`${process.env.FIN_API_URL}/menu/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData)
      })
    ])
    .then(responses => Promise.all(responses.map(res => res.json())))
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
  };
  

  return (
    <PageWrapper>
      <h1>Widget Onboarding Page</h1>
      <FormWrapper onSubmit={handleSubmit}>
        <InputWrapper>
          <Label>Remote Entry URL:</Label>
          <Input
            type="text"
            value={remoteEntryUrl}
            onChange={(event) => setRemoteEntryUrl(event.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Scope:</Label>
          <Input
            type="text"
            value={scope}
            onChange={(event) => setScope(event.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Widget:</Label>
          <Input
            type="text"
            value={widget}
            onChange={(event) => setWidget(event.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Label:</Label>
          <Input
            type="text"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            required
          />
        </InputWrapper>
        <Button type="submit">Onboard Widget</Button>
        {successMessage && (
          <SuccessMessage>Widget onboarded successfully!</SuccessMessage>
        )}
        {errorMessage && <ErrorMessage>Widget onboarding failed.</ErrorMessage>}
      </FormWrapper>
    </PageWrapper>
  );
}

export default WidgetOnboardingPage;
