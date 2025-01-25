import { Card } from "@ui5/webcomponents-react";
import React from "react";
import "./Events.css";
import Event from "../../utils/event/Event";
const Events = () => {
  return (
    <Card>
        <div className="events">
          <h3 className="events-title">Events</h3>
          <div className="events-body">
            <Event />
            <Event />
            <Event />
            <Event />
          </div>
      </div>
        </Card>
  );
};

export default Events;
