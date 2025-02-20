import React, { useState } from "react";
import Question from "../../../../components/question/Question";
import FormPreview from "../../../../components/formpreview/FormPreview";
import { Bar, Button, Card, Dialog, Icon } from "@ui5/webcomponents-react";
import "./FormBuilder.css";
import "@ui5/webcomponents-icons/dist/question-mark.js";
import "@ui5/webcomponents-icons/dist/excel-attachment.js";
import "@ui5/webcomponents-icons/dist/show.js";
import UsersListView from "../../../../components/userslistview/UsersListView";
import FormResponse from "../formresponse/FormResponse";
const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const [preview, setPreview] = useState(false);
  const [viewResponse, setViewResponse] = useState(false);

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

  // Update a question
  const updateQuestion = (id, updatedQuestion) => {
    setQuestions(questions.map((q) => (q.id === id ? updatedQuestion : q)));
  };

  // Delete a question
  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <Card className="forms-card">
      <div className="forms-container">
        <Dialog
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
                onClick={() => setActiveTab(0)}
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
                onClick={() => setActiveTab(1)}
              >
                <Icon
                  name="status-completed"
                  design={activeTab == 1 ? "Information" : ""}
                />
                <span>Responses (10)</span>
              </div>
            </div>
            {activeTab === 0 ? (
              <Button icon="show" onClick={openPreview}>
                Preview
              </Button>
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
          <div className="tab-body">
            {activeTab === 0 && (
              <div className="tab questions-tab">
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
              <div className="tab responses-tab">
                <div className="users-list-view">
                  <UsersListView handler={()=>{setViewResponse(true)}} />
                </div>
                <div className="section-seperator"></div>
                <div className="response-page">
                  <FormResponse viewResponse={viewResponse} handler={()=>setViewResponse(false)}/>
                </div>

                {/* <div className="course-list">Responses</div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FormBuilder;
