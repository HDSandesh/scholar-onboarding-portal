import React, { useEffect, useRef, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Popover, Button } from "@ui5/webcomponents-react";

const localizer = momentLocalizer(moment);

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popoverTarget, setPopoverTarget] = useState(null);
  const popoverRef = useRef();

  useEffect(() => {
    axios.get("/api/events").then((res) => {
      const formatted = res.data.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        start: new Date(event.date),
        end: new Date(new Date(event.date).getTime() + 60 * 60 * 1000),
      }));
      setEvents(formatted);
    });
  }, []);

  // Custom Event Renderer with clickable target
  const EventWithPopover = ({ event }) => {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation(); // prevent calendar's default handling
          setSelectedEvent(event);
          setPopoverTarget(e.currentTarget);
          popoverRef.current.open = true;
        }}
        style={{ cursor: "pointer" }}
      >
        {event.title}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Event Calendar</h2>
      <div style={{ height: "80vh" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          components={{ event: EventWithPopover }}
          defaultView="month"
          views={["month", "week", "day"]}
          popup
        />
      </div>

      {/* UI5 Popover for Event Details */}
      <Popover ref={popoverRef} opener={popoverTarget} headerText={selectedEvent?.title}>
        <div style={{ padding: "1rem", maxWidth: "300px" }}>
          <p>{selectedEvent?.description || "No description provided."}</p>
        </div>
      </Popover>
    </div>
  );
};

export default EventPage;
