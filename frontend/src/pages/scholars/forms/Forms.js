import React, { useState, useEffect, useContext } from "react";
import Form from "../../../components/form/Form"; // Assuming each form is rendered as a card
import "./Forms.css";
import { Button, Icon } from "@ui5/webcomponents-react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import MessageContext from "../../../contexts/MessageContext"
import UserContext from "../../../contexts/UserContext";

const Forms = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [forms, setForms] = useState([]);
  const showAlert = useContext(MessageContext)
  const navigate = useNavigate()
  const userInfo = useContext(UserContext)

  const fillForm = (id) => {
    navigate("/forms/fill-form/"+id)
  }

  useEffect(() => {
    if(userInfo)
        fetchForms('unfilled');
  }, [userInfo]);

  const tabChangeHandler = (tab) =>{
    setActiveTab(tab)
    const status = tab === 0 ? 'unfilled': 'filled';
    fetchForms(status)
  }
  
  const fetchForms = async (status) => {
    try {
      const response = await axios.get(`/forms/user/${userInfo?.id}`,{
        params:{
            status
        }
      }); // Backend route for getting all forms
      setForms(response.data);
    } catch (error) {
      console.error("Failed to fetch forms:", error);
      showAlert("Failed to fetch forms","Negative")
    }
  };

  const viewForm = (id)=>{
    console.log(id)
  }

  return (
    <div className="forms">
      <div className="tab-container">
        <div className="tab-strip">
          <div className="tabs">
            <div
              className={`tab-heading ${activeTab === 0 ? "active-tab" : ""}`}
              onClick={() => tabChangeHandler(0)}
            >
              <Icon name="pending" design={activeTab === 0 ? "Information" : ""} />
              <span>Pending</span>
            </div>
            <div
              className={`tab-heading ${activeTab === 1 ? "active-tab" : ""}`}
              onClick={() => tabChangeHandler(1)}
            >
              <Icon name="status-completed" design={activeTab === 1 ? "Information" : ""} />
              <span>Completed</span>
            </div>
          </div>
        </div>

        <div className="forms-list">
          {forms?.length > 0 ? (
            forms.map(form => (
              <Form key={form.id} form={form} scholarForm fillForm={(id)=>fillForm(id)} completed={activeTab===1} viewForm={(id)=> viewForm(id)}/>
            ))
          ) : (
            <div className="no-forms">No forms available in this category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forms;
