import React, { useState } from "react";
import {
  Button,
  Card,
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
    <Card>
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
          {questionType === "scale" && <Slider min="1" max="5" />}
          {questionType === "date" && (
            <DatePicker disabled primaryCalendarType="Gregorian" valueState="None" />
          )}
          {questionType === "time" && <TimePicker valueState="None" disabled />}
        </div>
      </div>
    </Card>
  );
};

export default Question;
