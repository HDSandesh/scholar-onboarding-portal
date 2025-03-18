import {
  ActionSheet,
  Button,
  Icon,
  Input,
  TextArea,
} from "@ui5/webcomponents-react";
import { React, useState, useRef } from "react";
import Profile from "../../utils/profile/Profile";
import "@ui5/webcomponents-icons/dist/paper-plane.js";
import "./MessageView.css";
import Message from "../../utils/message/Message";
const MessageView = ({ viewResponse, handler }) => {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpenerClick = (e) => {
    setOpen((prev) => !prev);
  };
  return (
    <div
      className={viewResponse ? "message-area view-message" : "message-area"}
    >
      <div className="message-header">
        <div className="message-header-left">
          <Button design="Transparent" icon="arrow-left" onClick={handler} />
          <Profile
            name="Ashwin Prabhu"
            picture={
              "https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            description="01/04/2023 10:00AM"
          />
        </div>
        <div>
          <Icon
            name="overflow"
            style={{ transform: "rotate(90deg)", color: "#000", cursor:"pointer" }}
            onClick={handleOpenerClick}
            ref={buttonRef}
          ></Icon>
          <ActionSheet opener={buttonRef.current} open={open}>
            <Button icon="accept">Accept</Button>
            <Button icon="decline">Reject</Button>
            <Button icon="email">Email</Button>
            <Button icon="forward">Forward</Button>
            <Button icon="delete">Delete</Button>
            <Button>Other</Button>
          </ActionSheet>
        </div>
      </div>
      <div className="message-block">
        <Message picture="https://plus.unsplash.com/premium_photo-1682096358356-5ffbe52b7aa1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <Message picture="https://plus.unsplash.com/premium_photo-1682096358356-5ffbe52b7aa1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <Message picture="https://plus.unsplash.com/premium_photo-1682096358356-5ffbe52b7aa1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <Message picture="https://plus.unsplash.com/premium_photo-1682096358356-5ffbe52b7aa1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <Message picture="https://plus.unsplash.com/premium_photo-1682096358356-5ffbe52b7aa1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <Message picture="https://plus.unsplash.com/premium_photo-1682096358356-5ffbe52b7aa1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <Message picture="https://plus.unsplash.com/premium_photo-1682096358356-5ffbe52b7aa1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <Message picture="https://plus.unsplash.com/premium_photo-1682096358356-5ffbe52b7aa1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <Message picture="https://plus.unsplash.com/premium_photo-1682096358356-5ffbe52b7aa1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <Message picture="https://plus.unsplash.com/premium_photo-1682096358356-5ffbe52b7aa1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
      <div className="message-inputs">
        <TextArea rows={1} />
        <Button design="Emphasized" icon="paper-plane"></Button>
      </div>
    </div>
  );
};

export default MessageView;
