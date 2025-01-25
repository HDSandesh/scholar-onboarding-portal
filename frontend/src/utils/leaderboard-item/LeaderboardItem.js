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
            <Profile name={name} picture={"https://sap.github.io/ui5-webcomponents-react/v2/assets/Person-B7wHqdJw.png"} description={points}/>
        </div>
      <Button>View</Button>
    </div>
  )
}

export default LeaderboardItem
