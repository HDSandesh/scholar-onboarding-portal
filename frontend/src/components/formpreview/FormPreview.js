import React from "react";
import "./FormPreview.css";
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
} from "@ui5/webcomponents-react";
const FormPreview = ({ questions }) => {
  return (
    <div className="form-preview">
      {questions.length === 0 ? (
        <p>No questions added yet.Please wait till something gets added</p>
      ) : (
        questions.map((q, index) => (
            <div key={index} className="preview-question">
              <p>
                <strong>{index+1}. {q.text || "Untitled Question"}</strong>
              </p>
              <hr />
              {q.type === "short-answer" && (
                <Input
                  maxlength={4000}
                  key={index}
                  type="Text"
                  valueState="None"
                />
              )}
              {q.type === "paragraph" && <TextArea key={index} />}
              {q.type === "mcq" &&
                q.options.map((option, i) => (
                    <RadioButton
                      onChange={function Ki() {}}
                      text={option}
                      key={i}
                      name={q + index}
                      valueState="None"
                    />
                ))}
              {q.type === "checkbox" &&
                q.options.map((option, i) => (
                    <CheckBox key={i} text={option} />
                ))}
              {q.type === "dropdown" && (
                <Select>
                  {q.options.map((option, i) => (
                    <Option key={i}>{option}</Option>
                  ))}
                </Select>
              )}
              {q.type === "scale" && <Slider key={index} min={parseInt(q.min)??0} max={parseInt(q.max)??10}  />}
              {q.type === "date" && (
                <DatePicker key={index} primaryCalendarType="Gregorian" valueState="None" />
              )}
              {q.type === "time" && <TimePicker key={index} valueState="None"/>}
            </div>
        ))
      )}
    </div>
  );
};

export default FormPreview;
