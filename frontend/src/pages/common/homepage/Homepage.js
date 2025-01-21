import React, { useState } from "react";
import "./Homepage.css";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/people-connected.js";
import "@ui5/webcomponents-icons/dist/education.js";
import "@ui5/webcomponents-icons/dist/survey.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/log.js";
import { Card, Text, Title } from "@ui5/webcomponents-react";
import Post from "../../../components/post/Post";
import Leaderboard from "../../../components/leaderboard/Leaderboard";
const Homepage = (props) => {
  return (
    <div className="homepage">
      <section className="post-area">
        <Post
          name="Nisha Pandey"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of HTML which can hack NASA"
        />
        <Post
          name="Nisha Pandey"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of HTML which can hack NASA"
        />
        <Post
          name="Nisha Pandey"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of HTML which can hack NASA"
        />
        <Post
          name="Nisha Pandey"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of HTML which can hack NASA"
        />
        <Post
          name="Nisha Pandey"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of HTML which can hack NASA"
        />
        <Post
          name="Nisha Pandey"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of HTML which can hack NASA"
        />
        <Post
          name="Nisha Pandey"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of HTML which can hack NASA"
        />
        <Post
          name="Nisha Pandey"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of HTML which can hack NASA"
        />
        <Post
          name="Nisha Pandey"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of HTML which can hack NASA"
        />
        <Post
          name="Nisha Pandey"
          postedOn="20 mins ago"
          postText="Hello Guys, I'm thrilled to share that I've been completed the Advanced version of HTML which can hack NASA"
        />
      </section>
      <section className="activities-section">
        <div className="leaderboard">
          <Leaderboard/>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
