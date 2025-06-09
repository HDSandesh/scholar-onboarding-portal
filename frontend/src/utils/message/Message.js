import React, { useEffect } from 'react'
import './Message.css'
import { Avatar } from '@ui5/webcomponents-react';

const Message = ({ groupMessage, participants }) => {

    // Helper to format main message time as "MMM dd, yyyy, hh:mm am/pm"
    const formatMainTime = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    };
  
    // Helper to format extended messages time as "hh:mm" in 24-hour format
    const formatExtendedTime = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      // Using Intl.DateTimeFormat for hh:mm 24h format
      return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    const getInitials = (name) => {
        const [firstName = '', lastName = ''] = name.trim().split(' ');
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
      };
  
    return (
      <div className="message-container">
        <div className="message-heading-container">
          {participants[groupMessage?.senderId]?.user?.profilePicture?<img
            className="display-picture"
            src={participants[groupMessage?.senderId]?.user?.profilePicture}
            alt="profile"
          />: <div className='display-picture'>{getInitials(participants[groupMessage?.senderId]?.user?.firstName + " " + participants[groupMessage?.senderId]?.user?.lastName)}</div>}
          <div className="message-details">
            <h4>
              {participants[groupMessage?.senderId]?.user?.firstName + " " + participants[groupMessage?.senderId]?.user?.lastName} { " "}
              <span className="time">
                {formatMainTime(groupMessage?.messages[0]?.sentAt)}
              </span>
            </h4>
            <p>{groupMessage?.messages[0]?.content}</p>
          </div>
        </div>
        <div className="extended-messages">
          {groupMessage?.messages?.slice(1)?.map((message, index) => (
            <div className="extended-message" key={index}>
              <span className="time faded-time">
                {formatExtendedTime(message?.sentAt)}
              </span>
              <p>{message?.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default Message
