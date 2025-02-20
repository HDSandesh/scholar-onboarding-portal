import React from "react";
import "./FormResponse.css";
import "@ui5/webcomponents-icons/dist/arrow-left.js"
import {
  Card,
  CheckBox,
  Input,
  RadioButton,
  Select,
  TextArea,
  Option,
  Slider,
  DatePicker,
  TimePicker,
  Button,
  Icon,
} from "@ui5/webcomponents-react";
import Profile from "../../../../utils/profile/Profile";

const FormResponse = ({viewResponse,handler}) => {
  const responses = [
    { text: "What is your name?", type: "short-answer", answer: "John Doe" },
    { text: "Describe yourself", type: "paragraph", answer: "I am a software engineer at SAP." },
    { text: "Select your gender", type: "mcq", answer: "Male", options: ["Male", "Female", "Other"] },
    { text: "Choose your skills", type: "checkbox", answer: ["React", "Node.js"], options: ["React", "Node.js", "Python"] },
    { text: "Select your country", type: "dropdown", answer: "India", options: ["USA", "India", "Germany"] },
    { text: "Rate your experience", type: "scale", answer: 4 },
    { text: "Pick a date", type: "date", answer: "2025-02-20" },
    { text: "Pick a time", type: "time", answer: "14:30" },
  ];

  return (
    <div className={viewResponse?"form-response view-response":"form-response"}>
      <div className="response-header-mobile">
        <Button design="Transparent" icon="arrow-left" onClick={handler}/>
        <Profile name="Ashwin Prabhu" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
      </div>
      {responses.map((q, index) => (
        <div key={index} className="response-card">
          <div className="response-question">
            <p><strong>{q.text}</strong></p>
            <div className="underline"/>
            {q.type === "short-answer" && <Input value={q.answer} readonly />}
            {q.type === "paragraph" && <TextArea value={q.answer} readonly />}
            {q.type === "mcq" && (
              q.options.map((option, i) => (
                <RadioButton key={i} text={option} checked={q.answer === option} readonly />
              ))
            )}
            {q.type === "checkbox" && (
              q.options.map((option, i) => (
                <CheckBox key={i} text={option} checked={q.answer.includes(option)} readonly />
              ))
            )}
            {q.type === "dropdown" && (
              <Select disabled>
                {q.options.map((option, i) => (
                  <Option key={i} selected={q.answer === option}>{option}</Option>
                ))}
              </Select>
            )}
            {q.type === "scale" && <Slider value={q.answer} disabled />}
            {q.type === "date" && <DatePicker value={q.answer} readonly />}
            {q.type === "time" && <TimePicker value={q.answer} readonly />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormResponse;
