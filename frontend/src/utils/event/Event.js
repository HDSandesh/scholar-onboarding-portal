import { Button } from "@ui5/webcomponents-react";
import React from "react";
import "./Event.css";
const Event = () => {
  return (
    <div className="event">
      <div className="event-body">
        <div className="color-band"></div>
        <div>
          <h4>Some Event Heading 1</h4>
          <p>20-12-2025 10:00 AM</p>
        </div>
      </div>
      <Button>View</Button>
    </div>
  );
};

export default Event;
