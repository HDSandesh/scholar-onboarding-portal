import React from 'react'
import Profile from '../profile/Profile'
import { Button } from '@ui5/webcomponents-react'
import './LeaderboardItem.css'
const LeaderboardItem = ({name,rank, picture,points}) => {
  return (
    <div className='leaderboard-item'>
        <div className='leaderboard-item-body'>
            <h3>#{rank}</h3>
            <div className='seperator'></div>
            <Profile name={name} picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description={points}/>
        </div>
      <Button>View</Button>
    </div>
  )
}

export default LeaderboardItem
