import { React, useContext, useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client'
import UsersListView from "../../../components/userslistview/UsersListView";
import "./Connect.css";
import { Card } from "@ui5/webcomponents-react";
import MessageView from "../../../components/messageview/MessageView";
import axios from "../../../api/axios";
import MessageContext from "../../../contexts/MessageContext";
import UserContext from "../../../contexts/UserContext";

const Connect = () => {
  const [viewResponse, setViewResponse] = useState(false);
  const userInfo = useContext(UserContext);
  const showAlert = useContext(MessageContext);
  const [profiles, setProfiles] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const [userStatus, setUserStatus] = useState('offline');

  // Socket ref to keep socket instance stable
  const socketRef = useRef(null);

  const userSearchHandler = async (query) => {
    try {
      const res = await axios.get(`/users?query=${query}&page=1&limit=10`);
      setProfiles(res?.data?.data?.filter(user=>user?.id!==userInfo?.id));
    } catch (err) {
      console.log(err)
      showAlert("Failed to load accounts. Please try again!");
    }
  };

  const createChat = async (participantIds, isGroup = false, name) => {
    try {
      const response = await axios.post("/chats", {
        isGroup,
        name,
        participantIds,
      });
      setPopoverIsOpen(false);
      openChatHandler(response?.data.id)
      setViewResponse(true);
      getChatHistory();
    } catch (error) {
      console.error("Error creating chat:", error);
      showAlert("Failed to create chat. Please try again!", "Negative");
    }
  };

  const getChatHistory = async () => {
    try {
      const res = await axios.get(`/chats/${userInfo.id}`);
      setChatHistory(res?.data);
    } catch (err) {
      console.error(err);
      showAlert("Failed to load Chat History. Please try again!", "Negative");
    }
  };

  const openChatHandler = async (id) => {
    try {
      setPopoverIsOpen(false);
      setViewResponse(true);
      const { data: chatData } = await axios.get(`/chats/chat/${id}`);
      setCurrentChat(chatData);
    } catch (error) {
      console.error("Failed to open chat:", error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      getChatHistory();
    }
  }, [userInfo]);

  // Socket.IO integration
  useEffect(() => {
    if (!userInfo) return;

    // Initialize socket connection
    const socket = io("http://localhost:3006");
    socketRef.current = socket;

    // Join the current chat room if selected
    if (currentChat?.id) {
      socket.emit("joinChat", currentChat.id);
    }

    socket.on('usersOnline',(count)=>{
      if(count===2)
        setUserStatus('online')
      else
        setUserStatus('offline')
    })

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      appendMessage(message)
      // setChatHistory((prev) => [...prev, message]);
    });

    // Listen for typing indicators
    socket.on("typing", () => {
      setUserStatus('typing...')
    });

    socket.on("stopTyping", () => {
      setUserStatus('online')
    });

    // Listen for message seen/read receipt
    socket.on("userLeft", () => {
      socket.emit('usersOnline',currentChat?.id)
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userInfo, currentChat]);

  // Function to emit typing events
  const emitTyping = () => {
    if (socketRef.current && currentChat) {
      socketRef.current.emit("typing", {
        chatId: currentChat.id,
        userId: userInfo.id,
      });
    }
  };

  const emitStopTyping = () => {
    if (socketRef.current && currentChat) {
      socketRef.current.emit("stopTyping", {
        chatId: currentChat.id,
        userId: userInfo.id,
      });
    }
  };

  const sendMessage = (messageContent, setMessage) => {
    if (socketRef.current && currentChat && messageContent) {
      const newMessage = {
        senderId: userInfo.id,
        chatId: currentChat.id,
        content: messageContent,
        sentAt: new Date().toISOString(),
      };
  
      socketRef.current.emit("sendMessage", newMessage);
      setMessage()
    }
  };

  const appendMessage = (newMessage) =>{
    setCurrentChat((prev) => {
      const updatedChat = { ...prev };
      const groupedMessages = [...updatedChat.groupedMessages];
      const lastGroup = groupedMessages[groupedMessages.length - 1];
      if (lastGroup && lastGroup.senderId === newMessage.senderId) {
        // Append to last group
        lastGroup.messages.push(newMessage);
      } else {
        // Create a new group
        groupedMessages.push({
          senderId: newMessage.senderId,
          messages: [newMessage],
        });
      }

      updatedChat.groupedMessages = groupedMessages;
      return updatedChat;
    });
  }

  return (
    <Card className="connect">
      <div className="connect-card">
        <div className="users-list-view">
          <UsersListView
            profiles={profiles}
            viewResponse={viewResponse}
            searchHandler={(query) => userSearchHandler(query)}
            openChat={(id) => openChatHandler(id)}
            setPopoverIsOpen={setPopoverIsOpen}
            onProfileClick={(ids)=>createChat(ids)}
            popoverIsOpen={popoverIsOpen}
            chatHistory={chatHistory}
            selectedId={currentChat?.id}
          />
        </div>
        <div className="section-seperator"></div>
        {currentChat?<MessageView
          viewResponse={viewResponse}
          currentChat={currentChat}
          emitTyping={emitTyping}
          emitStopTyping={emitStopTyping}
          userStatus={userStatus}
          handler={() => {
            setViewResponse(false);
            setCurrentChat(null)
          }}
          sendMessage={(message,setMessage) => sendMessage(message,setMessage)}
        />:<div className="start-conversation">Please select a user to get started with the conversation!</div>}
      </div>
    </Card>
  );
};

export default Connect;
