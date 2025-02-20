import React, { useState } from "react";
import "./Homepage.css";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/people-connected.js";
import "@ui5/webcomponents-icons/dist/education.js";
import "@ui5/webcomponents-icons/dist/survey.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/log.js";
import Post from "../../../components/post/Post";
import Leaderboard from "../../../components/leaderboard/Leaderboard";
import Events from "../../../components/events/Events";
const Homepage = (props) => {
  return (
    <div className="homepage">
      <section className="post-area">
        <Post
          name="Sandesh H D"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of UI5"
        />
        <Post
          name="Sandesh H D"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of UI5"
        />
        <Post
          name="Sandesh H D"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of UI5"
        />
        <Post
          name="Sandesh H D"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of UI5"
        />
        <Post
          name="Sandesh H D"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of UI5"
        />
        <Post
          name="Sandesh H D"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of UI5"
        />
        <Post
          name="Sandesh H D"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of UI5"
        />
        <Post
          name="Sandesh H D"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of UI5"
        />
        <Post
          name="Sandesh H D"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of UI5"
        />
        <Post
          name="Sandesh H D"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of UI5"
        />
      </section>
      <section className="activities-section">
          <Leaderboard/>
          <Events />
      </section>
    </div>
  );
};

export default Homepage;
