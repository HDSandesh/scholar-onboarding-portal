import {
  ActionSheet,
  Button,
  Icon,
  Input,
  TextArea,
} from "@ui5/webcomponents-react";
import { React, useState, useRef, useEffect, useContext } from "react";
import Profile from "../../utils/profile/Profile";
import "@ui5/webcomponents-icons/dist/paper-plane.js";
import "./MessageView.css";
import Message from "../../utils/message/Message";
import UserContext from "../../contexts/UserContext";
const MessageView = ({ viewResponse, handler, currentChat, sendMessage, emitTyping, emitStopTyping, userStatus }) => {
  const buttonRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [participants, setParticipants] = useState({});
  const [otherParticipants, setOtherParticipants] = useState([]);
  const userInfo = useContext(UserContext)
  const handleOpenerClick = (e) => {
    setOpen((prev) => !prev);
  };
  useEffect(()=>{
    let participantMap = {}
    let otherParticipants = []
    currentChat?.chatParticipants?.forEach(participant=>{
      if(participant?.userId !== userInfo?.id){
        otherParticipants.push(participant)
      }
      if(!participantMap[participant.userId]){
        participantMap[participant.userId] = {}
      }
      participantMap[participant.userId] = participant
    })
    setParticipants(participantMap)
    setOtherParticipants(otherParticipants)
    const el = messagesEndRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth", // 👈 makes the scroll smooth!
      });
    }

  },[currentChat])

  return (
    <div
      className={viewResponse ? "message-area view-message" : "message-area"}
    >
      <div className="message-header">
        <div className="message-header-left">
          <Button design="Transparent" icon="arrow-left" onClick={handler} />
          <Profile
            name={otherParticipants[0]?.user?.firstName + " " + otherParticipants[0]?.user?.lastName}
            picture={
              otherParticipants[0]?.user?.profilePicture
            }
            description={
              userStatus
            }
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
            <Button icon="high-priority">Report</Button>
          </ActionSheet>
        </div>
      </div>
      <div className="message-block" ref={messagesEndRef}>
        {currentChat?.groupedMessages.map((groupMessage,index)=>(
          <Message participants={participants} groupMessage={groupMessage} key={index} picture="https://plus.unsplash.com/premium_photo-1682096358356-5ffbe52b7aa1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        ))}
      </div>
      <div className="message-inputs">
        <TextArea rows={1} onChange={(e)=> setMessage(e.target.value)} value={message} onFocus={emitTyping} onBlur={emitStopTyping}/>
        <Button design="Emphasized" icon="paper-plane" onClick={()=>sendMessage(message, setMessage)}></Button>
      </div>
    </div>
  );
};

export default MessageView;
