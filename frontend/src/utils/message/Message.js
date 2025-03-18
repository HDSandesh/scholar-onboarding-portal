import React from 'react'
import Profile from '../profile/Profile'
import './Message.css'
const Message = ({picture}) => {
  return (
    <div className="message-container">
        <div className="message-heading-container">
            <img
                className="display-picture"
                src={picture}
                alt="profile"
                />
            <div className="message-details">
                <h4>Sandesh H D <span className="time">11:56</span></h4>
                <p>World</p>
            </div>
        </div>
        <div className="extended-messages">
            <div className="extended-message">
                <span className="time faded-time">12:59</span>
                <p>Hello checking again</p>
            </div>
            <div className="extended-message">
                <span className="time faded-time">12:59</span>
                <p>Hello checking again</p>
            </div>
        </div>
    </div>
  )
}

export default Message
