import React, { useContext, useEffect, useRef, useState } from "react";
import "./Post.css";
import "@ui5/webcomponents-icons/dist/heart-2.js";
import "@ui5/webcomponents-icons/dist/post.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import {
  Carousel,
  Icon,
  Menu,
  MenuItem,
  Popover,
  Tag
} from "@ui5/webcomponents-react";
import Profile from "../../utils/profile/Profile";
import axios from "../../api/axios";
import MessageContext from "../../contexts/MessageContext";
const Post = ({
  id,
  user,
  postedOn,
  postText,
  media,
  isApproved,
  tags,
  handleParentUpdate,
}) => {
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
  const [popoverIsOpen, setPopoverIsOpen] = useState(null);
  const buttonRef = useRef(null);
  const popOverRef = useRef(null);

  const showAlert = useContext(MessageContext);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setLoggedInUser(userInfo);
    }
  }, []);

  const checkIsPostOwner = () => {
    return loggedInUser?.id === user?.id;
  };

  const checkModerator = () => {
    return ["Admin", "VTManager", "OnboardingBuddy"].includes(
      loggedInUser?.role
    );
  };

  const approvePost = async (id) => {
    try {
      await axios.patch(`/posts/${id}/approve`);
      showAlert("Post approved successfully!", "Positive");
      handleParentUpdate(id, "approve");
      // Optionally show a success toast here
    } catch (error) {
      showAlert("Failed to approve post. Please try again!", "Negative");
      // Show error toast or message to user
    }
  };

  const rejectPost = async (id) => {
    try {
      await axios.patch(`/posts/${id}/reject`);
      showAlert("Post rejected successfully!", "Positive");
      handleParentUpdate(id, "reject");
      // Optionally show a success toast here
    } catch (error) {
      showAlert("Failed to reject post. Please try again!", "Negative");
      // Show error toast or message to user
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);
      handleParentUpdate(id, "delete");
      showAlert("Post deleted successfully!", "Positive");
    } catch (error) {
      showAlert("Failed to delete post. Please try again!", "Negative");
      // Show error toast or message to user
    }
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
      console.error(
        `Failed to ${action} post:`,
        error.response?.data?.message || error.message
      );
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
              <div className="post-action-icons">
                {!isApproved && (
                  <>
                    <Icon
                      ref={popOverRef}
                      onClick={() => setPopoverIsOpen(true)}
                      name="warning"
                      design="Critical"
                      style={{ height: "20px", width: "20px" }}
                      showTooltip
                    />
                    <Popover
                      className="footerPartNoPadding"
                      horizontalAlign="Center"
                      placement="Start"
                      verticalAlign="Center"
                      opener={popOverRef.current}
                      open={popoverIsOpen}
                      onClose={() => {
                        setPopoverIsOpen(false);
                      }}
                    >
                      Requires Approval
                    </Popover>
                  </>
                )}
                <Icon
                  name="overflow"
                  ref={buttonRef}
                  style={{ transform: "rotate(90deg)", color: "#000" }}
                  onClick={() => setIsOpen((prev) => !prev)}
                ></Icon>
              </div>
              <Menu
                opener={buttonRef.current}
                open={isOpen}
                className="post-menu"
              >
                {checkModerator() && (
                  <>
                    {!isApproved && (
                      <MenuItem
                        text="Approve"
                        icon="accept"
                        onClick={() => handleAction("approve")}
                      />
                    )}
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
        <p className="post-tags">
          {tags?.map((tag,index) => (
            <Tag
            key={index}
            design="Set2"
            colorScheme="5"
            icon={<Icon name="number-sign" />}
            onClick={function Ki() {}}
          >
            {tag}
          </Tag>
          ))}
        </p>
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
