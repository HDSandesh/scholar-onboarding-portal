import React from "react";
import "./Post.css";
import '@ui5/webcomponents-icons/dist/heart-2.js'
import '@ui5/webcomponents-icons/dist/post.js'
import { Icon, Menu, MenuItem } from "@ui5/webcomponents-react";
import Profile from "../../utils/profile/Profile";
const Post = ({ name, postedOn, postText }) => {
  return (
    <div className="post">
      <div className="post-header">
        <Profile name={name} picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description={postedOn}/>
        <div className="post-menu">
              <Icon
                name="overflow"
                style={{ transform: "rotate(90deg)", color: "#000" }}
              ></Icon>
            <Menu
              onBeforeClose={function Ki() {}}
              onBeforeOpen={function Ki() {}}
              onClose={function Ki() {}}
              onItemClick={function Ki() {}}
              onOpen={function Ki() {}}
              opener={null}
            >
              <MenuItem text="Edit" />
              <MenuItem text="Delete" />
              <MenuItem text="Close" />
              {/* <MenuSeparator /> */}
              <MenuItem icon="action-settings" text="Preferences" />
              <MenuItem icon="journey-arrive" text="Exit" />
            </Menu>
        </div>
      </div>
      <div className="post-body">
        <p className="post-text">{postText}</p>
        <div className="post-media">
            <img src="https://plus.unsplash.com/premium_photo-1675198764473-30434364c8b6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        </div>
      </div>
      <div className="reactions">
        <div className="reaction">
            <Icon name="heart-2" style={{height:20,width:20}}/>
            <span>100</span>
        </div>
        <div className="reaction">
            <Icon name="post" style={{height:18,width:18}}/>
            <span>100</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
