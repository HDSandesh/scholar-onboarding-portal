import React, { useContext, useEffect, useState } from "react";
import Question from "../../../../components/question/Question";
import FormPreview from "../../../../components/formpreview/FormPreview";
import {
  Bar,
  Button,
  Card,
  DateTimePicker,
  Dialog,
  Icon,
  Input,
  Label,
  TextArea,
} from "@ui5/webcomponents-react";
import "./FormBuilder.css";
import "@ui5/webcomponents-icons/dist/question-mark.js";
import "@ui5/webcomponents-icons/dist/excel-attachment.js";
import "@ui5/webcomponents-icons/dist/show.js";
import FormResponse from "../formresponse/FormResponse";
import axios from "../../../../api/axios";
import MessageContext from "../../../../contexts/MessageContext";
import { useParams } from "react-router-dom";
import FormSummary from "../formSummary/FormSummary";
const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [activeResponseTab, setActiveResponseTab] = useState();

  const [preview, setPreview] = useState(false);
  const [viewResponse, setViewResponse] = useState(false);
  const [responseCount, setResponseCount] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [fillBy, setFillBy] = useState();
  const showAlert = useContext(MessageContext);
  const { formId } = useParams();
  const openPreview = () => {
    setPreview(true);
  };
  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), type: "mcq", text: "", options: ["Option 1"] },
    ]);
  };

  const activeTabHandler = (tab) =>{
    setActiveTab(tab)
    setActiveResponseTab(0)
  }

  // Update a question
  const updateQuestion = (id, updatedQuestion) => {
    setQuestions((questions) =>
      questions.map((q) => {
        if (q.id !== id) return q;

        const base = {
          id: q.id,
          type: updatedQuestion.type,
          text: updatedQuestion.text,
        };

        // Only include relevant fields

        if (updatedQuestion.type === "scale") {
          base.min = updatedQuestion.min ?? 0;
          base.max = updatedQuestion.max ?? 10;
        }

        if (updatedQuestion.type === "date") {
          if (updatedQuestion.minDate) base.minDate = updatedQuestion.minDate;
          if (updatedQuestion.maxDate) base.maxDate = updatedQuestion.maxDate;
        }

        if (["mcq", "checkbox", "dropdown"].includes(updatedQuestion.type)) {
          base.options = updatedQuestion.options || [];
        }

        return base;
      })
    );
  };

  // Delete a question
  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  
  const getIndividualResponse = async () => {
    try {
      const response = await axios.get(`/forms/${formId}/individual`);
      
      console.log(response.data);
      // Reset form or redirect as needed
    } catch (error) {
      console.error(
        "Error saving form:",
        error.response?.data || error.message
      );
      showAlert("Failed to get summary. Please try again.", "Negative");
    }
  }

  const onSave = async () => {
    const payload = {
      title,
      description,
      fillBy, // ensure this is ISO string or valid date format
      fields: questions, // your array of questions
    };

    try {
      let response;
      if (formId) {
        response = await axios.put(`/forms/${formId}`, payload);
      } else {
        response = await axios.post("/forms", payload);
      }

      console.log("Form saved successfully:", response.data);
      showAlert("Form saved successfully!", "Positive");
      // Reset form or redirect as needed
    } catch (error) {
      console.error(
        "Error saving form:",
        error.response?.data || error.message
      );
      showAlert("Failed to save form. Please try again.", "Negative");
    }
  };

  const getFormDetails = async (id) => {
    try {
      const response = await axios.get(`/forms/${id}`);
      // console.log('Form saved successfully:', response.data);
      // showAlert('Form saved successfully!', "Positive");

      // Reset form or redirect as needed
      const formInfo = response.data;
      setTitle(formInfo.title);
      setDescription(formInfo.description);
      setFillBy(formInfo.fillBy);
      setQuestions(formInfo.fields);
      setResponseCount(formInfo.responseCount)
    } catch (error) {
      console.error(
        "Error saving form:",
        error.response?.data || error.message
      );
      showAlert("Failed to save form. Please try again.", "Negative");
    }
  };

  useEffect(() => {
    if (formId) {
      getFormDetails(formId);
    } else {
      console.log("No Id");
    }
  }, []);

  return (
    <Card className="forms-card">
      <div className="forms-container">
        <Dialog
          onClose={() => setPreview(false)}
          header={<h4>Preview</h4>}
          open={preview}
          stretch
          footer={
            <Bar
              design="Footer"
              endContent={
                <Button onClick={() => setPreview(false)}>Close</Button>
              }
            />
          }
          headerText=""
        >
          <FormPreview questions={questions} />
        </Dialog>
        <div className="tab-container form-tabs">
          <div className="tab-strip">
            <div className="tabs">
              <div
                className={
                  activeTab === 0 ? "tab-heading active-tab" : "tab-heading"
                }
                onClick={() => activeTabHandler(0)}
              >
                <Icon
                  name="question-mark"
                  design={activeTab == 0 ? "Information" : ""}
                />
                <span>Questions</span>
              </div>
              <div
                className={
                  activeTab === 1 ? "tab-heading active-tab" : "tab-heading"
                }
                onClick={() => activeTabHandler(1)}
              >
                <Icon
                  name="status-completed"
                  design={activeTab == 1 ? "Information" : ""}
                />
                <span>Responses ({responseCount})</span>
              </div>
            </div>
            <div>
              {activeTab === 0 ? (
                <>
                  <Button icon="show" onClick={openPreview}>
                    Preview
                  </Button>{" "}
                  &nbsp;
                  <Button icon="save" design="Emphasized" onClick={onSave}>
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  design="Emphasized"
                  icon="excel-attachment"
                  onClick={openPreview}
                >
                  Export
                </Button>
              )}
            </div>
          </div>
          <div className="tab-body">
            {activeTab === 0 && (
              <div className="tab questions-tab">
                <div className="question-info">
                  <div className="title-deadline">
                    <div>
                      <Label>Form Title</Label>
                      <br />
                      <Input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        style={{ width: "100%" }}
                        value={title}
                      ></Input>
                    </div>
                    <div>
                      <Label>Deadline</Label>
                      <br />
                      <DateTimePicker
                        onChange={(e) => setFillBy(e.target.value)}
                        style={{ width: "100%" }}
                        value={fillBy}
                      ></DateTimePicker>
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <TextArea
                      onChange={(e) => setDescription(e.target.value)}
                      type="text"
                      value={description}
                    ></TextArea>
                  </div>
                </div>
                {questions.map((q) => (
                  <Question
                    key={q.id}
                    questionData={q}
                    updateQuestion={updateQuestion}
                    deleteQuestion={() => deleteQuestion(q.id)}
                  />
                ))}
                <button onClick={addQuestion} className="add-question">
                  Click to add a question
                </button>
                <div className="preview-panel">
                  <h4>Form Preview</h4>
                  <FormPreview questions={questions} />
                </div>
                {/* Preview Section */}
              </div>
            )}
            {activeTab === 1 && (
              <div className="response-container">
                <h4 className="response-header">
                  {responseCount} Responses
                  </h4>
                <div className="tab">
                  <div className="tab-strip center-tab">
                    <div className="tabs">
                      <div
                        className={
                          activeResponseTab === 0
                            ? "tab-heading active-tab"
                            : "tab-heading"
                        }
                        onClick={() => setActiveResponseTab(0)}
                      >
                        <span>Summary</span>
                      </div>
                      <div
                        className={
                          activeResponseTab === 1
                            ? "tab-heading active-tab"
                            : "tab-heading"
                        }
                        onClick={() => setActiveResponseTab(1)}
                      >
                        <span>Individual</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="questions-tab">
              {activeResponseTab === 0 && activeTab === 1 && <FormSummary formId = {formId}/>}
              {activeResponseTab === 1 && activeTab === 1 && <FormResponse
                viewResponse={viewResponse}
                handler={() => setViewResponse(false)}
              />}

            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FormBuilder;
