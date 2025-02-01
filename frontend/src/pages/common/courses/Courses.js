import React, { useState } from "react";
import Course from "../../../components/course/Course";
import "./Courses.css";
import { Button, Icon, Tab, TabContainer } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/status-completed.js";
import "@ui5/webcomponents-icons/dist/pending.js";
const Courses = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="courses">
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
              <span>Pending (5)</span>
            </div>
            <div
              className={
                activeTab === 1 ? "tab-heading active-tab" : "tab-heading"
              }
              onClick={() => setActiveTab(1)}
            >
              <Icon name="status-completed" design={activeTab==1?"Information":""}/>
              <span>Completed (10)</span>
            </div>
          </div>
          <Button design="Emphasized">Create Course</Button>
        </div>
        <div className="tab-body">
          {activeTab === 0 && (
            <div className="tab">
              <div className="course-list">
                <Course />
                <Course />
                <Course />
                <Course />
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="tab">
              <div className="course-list">
                <Course />
                <Course />
                <Course />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
