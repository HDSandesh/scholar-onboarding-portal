import React, { useState } from "react";
import {
  Button,
  CheckBox,
  DatePicker,
  Input,
  Option,
  RadioButton,
  Select,
  Slider,
  TextArea,
  TimePicker,
} from "@ui5/webcomponents-react";
import "./Question.css";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/add.js";
const Question = ({ questionData, updateQuestion, deleteQuestion }) => {
  const [questionType, setQuestionType] = useState(questionData.type);
  const [questionText, setQuestionText] = useState(questionData.text);
  const [options, setOptions] = useState(questionData.options || ["Option 1"]);

  // Handle question type change
  const handleTypeChange = (e) => {
    setQuestionType(e.target.value);
    updateQuestion(questionData.id, { ...questionData, type: e.target.value });
  };

  // Handle text change
  const handleTextChange = (e) => {
    setQuestionText(e.target.value);
    updateQuestion(questionData.id, { ...questionData, text: e.target.value });
  };

  // Add option
  const addOption = () => {
    const newOptions = [...options, `Option ${options.length + 1}`];
    setOptions(newOptions);
    updateQuestion(questionData.id, { ...questionData, options: newOptions });
  };

  // Delete option
  const deleteOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    updateQuestion(questionData.id, { ...questionData, options: newOptions });
  };

  return (
      <div className="question-container">
        <div className="question-header">
            <Select
              onChange={handleTypeChange}
              valueState="None"
              value={questionType}
            >
              <Option value="mcq">Multiple Choice</Option>
              <Option value="short-answer">Short Answer</Option>
              <Option value="paragraph">Paragraph</Option>
              <Option value="dropdown">Dropdown</Option>
              <Option value="checkbox">Checkbox</Option>
              <Option value="scale">Scale</Option>
              <Option value="date">Date</Option>
              <Option value="time">Time</Option>
            </Select>
            <Button
              icon="delete"
              className="delete-button"
              onClick={deleteQuestion}
              design="Transparent"
            />
        </div>

        <div className="question-body">
        <Input
              className="form-input"
              onChange={handleTextChange}
              type="Text"
              placeholder="Untitled Question"
              valueState="None"
              value={questionText}
            />
          {questionType === "short-answer" && (
            <Input
              type="Text"
              value="Short answer"
              disabled
              valueState="None"
            />
          )}
          {questionType === "paragraph" && (
            <TextArea valueState="None" disabled value="Long answer" />
          )}
          {questionType === "mcq" &&
            options.map((option, index) => (
              <div key={index} className="mcq-option-group">
                <RadioButton name="mcq" disabled />
                <Input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                    updateQuestion(questionData.id, {
                      ...questionData,
                      options: newOptions,
                    });
                  }}
                />
                <Button
                  icon="delete"
                  className="delete-button"
                  onClick={()=>deleteOption(index)}
                  design="Transparent"
                />
              </div>
            ))}
          {["checkbox", "dropdown"].includes(questionType) &&
            options.map((option, index) => (
              <div key={index} className="mcq-option-group">
                {questionType === "checkbox" && (
                  <CheckBox disabled valueState="None" checked={false} />
                )}
                <Input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                    updateQuestion(questionData.id, {
                      ...questionData,
                      options: newOptions,
                    });
                  }}
                />
                <Button
                  icon="delete"
                  className="delete-button"
                  onClick={() => deleteOption(index)}
                  design="Transparent"
                />
              </div>
            ))}
          {["mcq", "checkbox", "dropdown"].includes(questionType) && (
            <Button className="add-option" icon="add" onClick={addOption} design="Emphasized">
              Add Option
            </Button>
          )}
          {questionType === "scale" && <div><br/>
            <Input type="Number" placeholder="min" onChange={(e)=>updateQuestion(questionData.id, {
              ...questionData,
              min: e.target.value
            })}/> &nbsp;
            <Input type="Number" placeholder="max" onChange={(e)=>updateQuestion(questionData.id, {
              ...questionData,
              max: e.target.value
            })}/>
          </div>}
          {questionType === "date" && (
            <div>
            <DatePicker value={questionData?.minDate} primaryCalendarType="Gregorian" valueState="None" onChange={(e)=> updateQuestion(questionData.id, {
              ...questionData,
              minDate: e.target.value
            })}/>
            <DatePicker value={questionData?.maxDate} primaryCalendarType="Gregorian" valueState="None" onChange={(e)=> updateQuestion(questionData.id, {
              ...questionData,
              maxDate: e.target.value
            })}/>
            </div>
          )}
          {questionType === "time" && <TimePicker valueState="None" disabled />}
        </div>
      </div>
  );
};

export default Question;
