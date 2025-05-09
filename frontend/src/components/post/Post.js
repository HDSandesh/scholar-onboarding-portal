import React, { useEffect, useRef, useState } from "react";
import "./Post.css";
import "@ui5/webcomponents-icons/dist/heart-2.js";
import "@ui5/webcomponents-icons/dist/post.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import { Carousel, Icon, Menu, MenuItem } from "@ui5/webcomponents-react";
import Profile from "../../utils/profile/Profile";
import axios from "../../api/axios"

const Post = ({ id, user, postedOn, postText, media, triggerReload }) => {
  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now - past) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(days / 365);
    return `${years}y ago`;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setLoggedInUser(userInfo);
    }
  }, []);

  const checkIsPostOwner = ()=>{
    return loggedInUser?.id === user?.id;
  }

  const checkModerator = ()=>{
   return ["Admin", "VTManager", "OnboardingBuddy"].includes(
      loggedInUser?.role
    );
  }

  const approvePost = async (id) => {
    await axios.patch(`/posts/${id}/approve`);
    console.log("Post approved");
  };
  
  const rejectPost = async (id) => {
    await axios.patch(`/posts/${id}/reject`);
    console.log("Post rejected");
  };
  
  const deletePost = async (id) => {
    await axios.delete(`/posts/${id}`);
    triggerReload()
  };
  
  const editPost = (id) => {
    // Open modal or redirect to edit page
    console.log("Edit post", id);
  };

  const handleAction = async (action) => {
    try {
      switch (action) {
        case "approve":
          await approvePost(id);
          break;
        case "reject":
          await rejectPost(id);
          break;
        case "edit":
          editPost(id);
          break;
        case "delete":
          await deletePost(id);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Failed to ${action} post:`, error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <Profile
          name={user.firstName + " " + user.lastName}
          picture={user.profilePicture}
          description={timeAgo(postedOn)}
        />
        <div className="post-menu">
          {(checkIsPostOwner() || checkModerator()) && (
            <>
              <Icon
                name="overflow"
                ref={buttonRef}
                style={{ transform: "rotate(90deg)", color: "#000" }}
                onClick={() => setIsOpen((prev) => !prev)}
              ></Icon>
              <Menu opener={buttonRef.current} open={isOpen} className="post-menu">
                {checkModerator() && (
                  <>
                    <MenuItem
                      text="Approve"
                      icon="accept"
                      onClick={() => handleAction("approve")}
                    />
                    <MenuItem
                      text="Reject"
                      icon="decline"
                      onClick={() => handleAction("reject")}
                    />
                  </>
                )}
                {checkIsPostOwner() && (
                  <MenuItem
                    text="Edit"
                    icon="post"
                    onClick={() => handleAction("edit")}
                  />
                )}
                <MenuItem
                  text="Delete"
                  icon="delete"
                  onClick={() => handleAction("delete")}
                />
              </Menu>
            </>
          )}
        </div>
      </div>
      <div className="post-body">
        <p className="post-text">{postText}</p>
        {media?.length > 0 && (
          <div className="post-media">
            <Carousel backgroundDesign="Transparent">
              {media.map((image, index) => (
                <img
                  key={index}
                  alt={`image-${index}`}
                  src={`http://127.0.0.1:3006/uploads/posts/${image}`}
                />
              ))}
            </Carousel>
          </div>
        )}
      </div>
      <div className="reactions">
        <div className="reaction">
          <Icon name="heart-2" style={{ height: 20, width: 20 }} />
          <span>100</span>
        </div>
        <div className="reaction">
          <Icon name="post" style={{ height: 18, width: 18 }} />
          <span>100</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
