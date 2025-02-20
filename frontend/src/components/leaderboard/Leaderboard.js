import { Card } from "@ui5/webcomponents-react";
import React from "react";
import "./Leaderboard.css"
import LeaderboardItem from "../../utils/leaderboard-item/LeaderboardItem";
const Leaderboard = () => {
  return (
    <Card>
      <div className="leaderboard">
        <h3 className="leaderboard-title">Leaderboard</h3>
        <div className="leaderboard-body">
          <LeaderboardItem name="Nisha Pandey" rank="1" points="19999"/>
          <LeaderboardItem name="Sandesh H D" rank="2" points="18999"/>
          <LeaderboardItem name="GG Ashwin Prabhu" rank="3" points="17563"/>
          <LeaderboardItem name="Krishna" rank="4" points="16998"/>
          <LeaderboardItem name="Subhash" rank="5" points="15997"/>
        </div>
      </div>
      
    </Card>
  );
};

export default Leaderboard;
