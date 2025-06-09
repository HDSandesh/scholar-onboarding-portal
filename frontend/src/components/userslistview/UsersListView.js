import React, { useEffect, useRef, useState } from "react";
import "./UsersListView.css";
import { Card, Icon, Input, Popover } from "@ui5/webcomponents-react";
import Profile from "../../utils/profile/Profile";
const UsersListView = ({
  profiles,
  searchHandler,
  openChat,
  popoverIsOpen,
  setPopoverIsOpen,
  chatHistory,
  onProfileClick,
  selectedId
}) => {
  const btnRef = useRef(null);

  const handleClick = (event, id) => {
    event.stopPropagation();
    openChat(id);
  };
  useEffect(() => {
    searchHandler("");
  }, [chatHistory]);
  return (
    <div className="users-list-card">
      <div className="users-list-card-header">
        <Input
          type="Search"
          className="form-input"
          placeholder="Search Response"
          icon={<Icon name="search" />}
          ref={btnRef}
          onFocus={() => setPopoverIsOpen(true)}
          onInput={(e) => searchHandler(e.target.value)}
        />
      </div>
      <Popover
        opener={btnRef.current}
        open={popoverIsOpen}
        hideArrow
        preventInitialFocus
        preventFocusRestore
        horizontalAlign="Stretch"
        placement="Bottom"
        onClose={() => {
          setPopoverIsOpen(false);
        }}
      >
        <div className="search-item-container">
          {profiles?.map((profile, index) => (
            <div
              className="search-item"
              key={index}
              onClick={() => onProfileClick([profile.id])}
            >
              <Profile
                description={profile.role}
                name={profile.firstName + " " + profile.lastName}
                picture={profile.profilePicture}
              />
              <Icon name="navigation-right-arrow" />
            </div>
          ))}
        </div>
      </Popover>
      <div className="users-list">
        {chatHistory?.map((chat, index) => (
          <div key={index} className={"profile-container "+ (selectedId === chat.id?"active":"")} onClick={(e) => handleClick(e,chat?.id)}>
            <Profile
              name={chat?.chatParticipants[0]?.user.firstName + " " + chat?.chatParticipants[0]?.user.lastName}
              picture={chat?.chatParticipants[0]?.user.profilePicture}
              description={chat?.chatParticipants[0]?.user?.role}
            />
            <Icon name="navigation-right-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersListView;
