import { Button, Card, Icon, Tag } from "@ui5/webcomponents-react";
import React from "react";
import "@ui5/webcomponents-icons/dist/number-sign.js";
import "./Course.css";
const Course = () => {
  return (
    <div className="course-container">
      <Card>
        <div className="course">
          <div className="course-heading">
            <div className="course-preview"></div>
            <div className="course-title">
              <h3>Long course with some heading</h3>
              <div className="title-subheading">
                <span>
                  By: <span className="title-value">Ashwin Prabhu</span>
                </span>
                <span>
                  Duration: <span className="title-value">2Hrs</span>
                </span>
              </div>
            </div>
          </div>
          <div className="course-body">
            <p>
              very long text copied from chatgpt as the description which has
              almost no meaning
            </p>
            <div className="hashtags">
              <Tag
                design="Set2"
                colorScheme="9"
                icon={<Icon name="number-sign" />}
                onClick={function Ki() {}}
              >
                UI5
              </Tag>
              <Tag
                design="Set2"
                colorScheme="9"
                icon={<Icon name="number-sign" />}
                onClick={function Ki() {}}
              >
                MVC
              </Tag>
            </div>
          </div>
          <div className="course-footer">
            <Button design="Emphasized">Link</Button>
            <Button>Mark as completed</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Course;
