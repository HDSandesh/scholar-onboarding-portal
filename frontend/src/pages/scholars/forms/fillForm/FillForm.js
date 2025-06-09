import axios from "../../../../api/axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageContext from "../../../../contexts/MessageContext";
import {
  Button,
  Card,
  CheckBox,
  DatePicker,
  Input,
  Option,
  Panel,
  RadioButton,
  Select,
  Slider,
  TextArea,
  TimePicker,
  Title,
} from "@ui5/webcomponents-react";
import "./FillForm.css";
const FillForm = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState();
  const showAlert = useContext(MessageContext);
  const [formState, setFormState] = useState({});
  const fetchForm = async () => {
    try {
      const response = await axios.get(`/forms/${formId}`); // Backend route for getting all forms
      //   setForms(response.data);
      setFormData(response?.data);
    } catch (error) {
      console.error("Failed to fetch forms:", error);
      showAlert("Failed to fetch forms", "Negative");
    }
  };

  const handleChange = (fieldId, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`/forms/${formId}/submit`, {
        responses: formState,
      });
      showAlert("Form submitted successfully!", "Positive");
    } catch (err) {
      showAlert("Form submission failed", "Negative");
      console.error(err);
    }
  };

  const appendFields = (field) => {
    const value = formState[field.id] || "";

    switch (field?.type) {
      case "mcq":
        return (
          <div key={field.id}>
            {field.options.map((option, idx) => (
              <RadioButton
                key={idx}
                name={field.id}
                text={option}
                selected={value === option}
                onChange={() => handleChange(field.id, option)}
              />
            ))}
          </div>
        );

      case "paragraph":
        return (
          <TextArea
            key={field.id}
            value={value}
            onInput={(e) => handleChange(field.id, e.target.value)}
            growing
          />
        );

      case "date":
        return (
          <DatePicker
            key={field.id}
            value={value}
            minDate={field?.minDate}
            maxDate={field?.maxDate}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );

      case "short-answer":
        return (
          <Input
            key={field.id}
            value={value}
            onInput={(e) => handleChange(field.id, e.target.value)}
          />
        );

      case "checkbox":
        const currentVals = formState[field.id] || [];
        return (
          <div key={field.id}>
            {field.options.map((option, idx) => (
              <CheckBox
                key={idx}
                text={option}
                checked={currentVals.includes(option)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...currentVals, option]
                    : currentVals.filter((o) => o !== option);
                  handleChange(field.id, updated);
                }}
              />
            ))}
          </div>
        );

      case "dropdown":
        return (
          <Select
            key={field.id}
            onChange={(e) =>
              handleChange(field.id, e.target.selectedOption.textContent)
            }
          >
            {field.options.map((option, idx) => (
              <Option key={idx} selected={value === option}>
                {option}
              </Option>
            ))}
          </Select>
        );

      case "time":
        return (
          <TimePicker
            key={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );

      case "scale":
        return (
          <Slider
            key={field.id}
            min={field.min || 0}
            max={field.max || 100}
            step={field.step || 1}
            value={value}
            showTickmarks
            showTooltip
            style={{marginTop:'20px'}}
            onInput={(e) => handleChange(field.id, e.target.value)}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    fetchForm();
  }, []);

  return (
    <div>
      <Card>
        <div className="fillform-container">
          <div className="fillform-heading">
            <h3>{formData?.title}</h3>
            <div className="title-subheading">
              <span>
                Last Date:{" "}
                <span className="title-value">
                  {new Date(formData?.fillBy).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </span>
              </span>
            </div>
          </div>
          <p>{formData?.description}</p>
        </div>
      </Card>
      <div className="questions-container">
        {formData?.fields.map((field) => (
          <Panel header={<Title level="H3">{field?.text}</Title>}>
            {appendFields(field)}
          </Panel>
        ))}
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default FillForm;
