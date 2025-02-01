import React, { useState } from 'react'
import Form from '../../../components/form/Form'
import './Forms.css'
import { Button, Icon } from '@ui5/webcomponents-react'

const Forms = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="forms">
      <div className="tab-container">
        <div className="tab-strip">
          <div className="tabs">
            <div
              className={
                activeTab === 0 ? "tab-heading active-tab" : "tab-heading"
              }
              onClick={() => setActiveTab(0)}
            >
              <Icon name="pending" design={activeTab==0?"Information":""}/>
              <span>Active (5)</span>
            </div>
            <div
              className={
                activeTab === 1 ? "tab-heading active-tab" : "tab-heading"
              }
              onClick={() => setActiveTab(1)}
            >
              <Icon name="status-completed" design={activeTab==1?"Information":""}/>
              <span>Inactive (10)</span>
            </div>
          </div>
          <Button design="Emphasized">Create Form</Button>
        </div>
        <div className="tab-body">
          {activeTab === 0 && (
            <div className="tab">
              <div className="course-list">
                <Form isActive/>
                <Form isActive/>
                <Form isActive/>
                <Form isActive/>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="tab">
              <div className="course-list">
                <Form />
                <Form />
                <Form />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Forms
