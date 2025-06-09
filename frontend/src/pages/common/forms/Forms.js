import React, { useState, useEffect, useContext } from "react";
import Form from "../../../components/form/Form"; // Assuming each form is rendered as a card
import "./Forms.css";
import { Button, Icon } from "@ui5/webcomponents-react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import MessageContext from "../../../contexts/MessageContext"

const Forms = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [forms, setForms] = useState([]);
  const showAlert = useContext(MessageContext)
  const navigate = useNavigate();
  useEffect(() => {
    fetchForms();
  }, []);

  const editForm = (id) => {
    navigate("/forms/form-builder/"+id)
  }

  const deleteForm = async (id) => {
    try {
      const response = await axios.delete(`/forms/${id}`);
      console.log('Form deleted successfully!', response.data);
      showAlert('Form deleted successfully!', "Positive");
      fetchForms();
    } catch (error) {
      console.error('Error deleting form:', error.response?.data || error.message);
      showAlert('Failed to delete form. Please try again.', "Negative");
    }
  }
  
  const toggleForm = async (id) => {
    try {
      const response = await axios.patch(`/forms/${id}/toggle-active`);
      console.log("Form toggled:", response?.data?.message);
      showAlert(response?.data?.message + " successfully!", "Positive");
      fetchForms()
    } catch (error) {
      console.error("Failed to toggle form:", error);
      showAlert("Failed to update the form status. Please try again!")
    }
  };

  const fetchForms = async () => {
    try {
      const response = await axios.get("/forms"); // Backend route for getting all forms
      setForms(response.data);
    } catch (error) {
      console.error("Failed to fetch forms:", error);
    }
  };

  const filteredForms = forms.filter(form =>
    activeTab === 0 ? form.isActive : !form.isActive
  );

  return (
    <div className="forms">
      <div className="tab-container">
        <div className="tab-strip">
          <div className="tabs">
            <div
              className={`tab-heading ${activeTab === 0 ? "active-tab" : ""}`}
              onClick={() => setActiveTab(0)}
            >
              <Icon name="pending" design={activeTab === 0 ? "Information" : ""} />
              <span>Active ({forms.filter(f => f.isActive).length})</span>
            </div>
            <div
              className={`tab-heading ${activeTab === 1 ? "active-tab" : ""}`}
              onClick={() => setActiveTab(1)}
            >
              <Icon name="status-completed" design={activeTab === 1 ? "Information" : ""} />
              <span>Inactive ({forms.filter(f => !f.isActive).length})</span>
            </div>
          </div>
          <Button design="Emphasized" onClick={() => navigate("/forms/form-builder")}>
            + Create Form
          </Button>
        </div>

        <div className="forms-list">
          {filteredForms.length > 0 ? (
            filteredForms.map(form => (
              <Form key={form.id} form={form} editForm={(id)=>editForm(id)} deleteForm={(id)=>deleteForm(id)} toggleForm = {(id) => toggleForm(id)} />
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
