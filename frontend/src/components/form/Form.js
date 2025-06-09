import { Button, ButtonBadge, Card } from "@ui5/webcomponents-react";
import React from "react";
import "@ui5/webcomponents-icons/dist/edit.js";
import "./Form.css";
const Form = ({ form, scholarForm, editForm, deleteForm, toggleForm, fillForm,viewForm, completed }) => {
  return (
    <div className="form-container">
      <Card>
        <div className="form">
          <div className="form-heading">
            <div className="form-title">
              <h3>{form?.title}</h3>
              <div className="title-subheading">
                <span>
                  Deadline:{" "}
                  <span className="title-value">
                    {new Date(form?.fillBy).toLocaleString("en-US", {
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
            {!scholarForm && <div className="form-edit">
              <Button icon="delete" design="Negative" onClick={() => deleteForm(form?.id)}/>
            </div>}
          </div>
          <div className="form-body">
            <p>{form?.description}</p>
          </div>
          <div className="form-footer">
            {scholarForm?(completed?<Button design="Emphasized" onClick={()=>viewForm(form?.id)}>View Response</Button>:<Button design="Emphasized" onClick={()=>fillForm(form?.id)}>Fill Form</Button>):<Button design="Emphasized" badge={<ButtonBadge design="OverlayText" text={form?.responseCount}/>} onClick={()=> editForm(form?.id)}>View Form</Button>}
            {!scholarForm && <Button design={form?.isActive ? "Attention" : "Positive"} onClick={()=> toggleForm(form?.id)}>
              {form?.isActive ? "Deactivate" : "Activate"}
            </Button>}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Form;
