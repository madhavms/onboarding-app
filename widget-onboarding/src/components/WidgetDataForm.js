import React, { useState } from "react";
import styled from "styled-components";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const SectionHeading = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  width: 100%;
  margin-top: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 15px;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const RemoveButton = styled(Button)`
  background-color: #e53935;
`;

const WidgetDataForm = ({ onSubmit, successMessage, errorMessage, clearMessage}) => {
  const [url, setUrl] = useState("");
  const [widget, setWidget] = useState("");
  const [label, setLabel] = useState("");
  const [display, setDisplay] = useState(true);
  const [layouts, setLayouts] = useState([{ h: "", w: "", x: "", y: "" }]);
  const [widgets, setWidgets] = useState([{ scope: "", widget: "" }]);
  const [fieldValidation, setFieldValidation] = useState("");

  const handleAddWidget = () => {
    setLayouts([...layouts, { h: "", w: "", x: "", y: "" }]);
    setWidgets([...widgets, { scope: "", widget: "" }]);
  };

  const clearForm = () => {
    setUrl("");
    setWidget("");
    setLabel("");
    setDisplay(true);
    setLayouts([{ h: "", w: "", x: "", y: "" }]);
    setWidgets([{ scope: "", widget: "" }]);
    clearMessage();
  };

  const handleRemoveWidget = (index) => {
    setLayouts((prevLayouts) => prevLayouts.filter((_, i) => i !== index));
    setWidgets((prevWidgets) => prevWidgets.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform form validation before submitting
    if (!url || !widget || !label || layouts.some((layout) => Object.values(layout).some((value) => !value)) || widgets.some((widget) => Object.values(widget).some((value) => !value))) {
      setFieldValidation("Please fill in all required fields.");
      return;
    }

    const widgetData = { url, template: { id: widget, layouts, widgets } };
    const menuData = { widget, label, display };
    setFieldValidation("");
    clearForm();
    onSubmit(widgetData, menuData);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <SectionWrapper>
        <Label>URL:</Label>
        <Input type="text" value={url} onChange={(event) => setUrl(event.target.value)} />
      </SectionWrapper>
      <SectionWrapper>
        <Label>Widget:</Label>
        <Input type="text" value={widget} onChange={(event) => setWidget(event.target.value)} />
      </SectionWrapper>
      <SectionWrapper>
        <Label>Label:</Label>
        <Input type="text" value={label} onChange={(event) => setLabel(event.target.value)} />
      </SectionWrapper>
      <SectionWrapper>
        <Label>Display:</Label>
        <Input
          type="checkbox"
          checked={display}
          onChange={() => setDisplay((prevDisplay) => !prevDisplay)}
        />
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeading>Layouts:</SectionHeading>
        {layouts.map((layout, index) => (
          <React.Fragment key={index}>
            <Label>Layout {index + 1}</Label>
            <Input
              type="text"
              value={layout.h}
              onChange={(event) => {
                const updatedLayouts = [...layouts];
                updatedLayouts[index].h = event.target.value;
                setLayouts(updatedLayouts);
              }}
              placeholder="h"
            />
            <Input
              type="text"
              value={layout.w}
              onChange={(event) => {
                const updatedLayouts = [...layouts];
                updatedLayouts[index].w = event.target.value;
                setLayouts(updatedLayouts);
              }}
              placeholder="w"
            />
            <Input
              type="text"
              value={layout.x}
              onChange={(event) => {
                const updatedLayouts = [...layouts];
                updatedLayouts[index].x = event.target.value;
                setLayouts(updatedLayouts);
              }}
              placeholder="x"
            />
            <Input
              type="text"
              value={layout.y}
              onChange={(event) => {
                const updatedLayouts = [...layouts];
                updatedLayouts[index].y = event.target.value;
                setLayouts(updatedLayouts);
              }}
              placeholder="y"
            />
          </React.Fragment>
        ))}
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeading>Widgets:</SectionHeading>
        {widgets.map((widget, index) => (
          <React.Fragment key={index}>
            <Label>Widget {index + 1}</Label>
            <Input
              type="text"
              value={widget.scope}
              onChange={(event) => {
                const updatedWidgets = [...widgets];
                updatedWidgets[index].scope = event.target.value;
                setWidgets(updatedWidgets);
              }}
              placeholder="Scope"
            />
            <Input
              type="text"
              value={widget.widget}
              onChange={(event) => {
                const updatedWidgets = [...widgets];
                updatedWidgets[index].widget = event.target.value;
                setWidgets(updatedWidgets);
              }}
              placeholder="Widget"
            />
            {index > 0 && (
              <RemoveButton type="button" onClick={() => handleRemoveWidget(index)}>
                Remove Widget
              </RemoveButton>
            )}
          </React.Fragment>
        ))}
      </SectionWrapper>
      <ButtonWrapper>
        <Button type="button" onClick={handleAddWidget}>
          Add Widget
        </Button>
        <Button type="submit">Submit Widget Data</Button>
      </ButtonWrapper>
       {/* Show success or error messages */}
       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
       {fieldValidation && <p style={{ color: "red" }}>{fieldValidation}</p>}
    </FormWrapper>
  );
};

export default WidgetDataForm;
