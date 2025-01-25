import React from 'react'
import './Profile.css'

const Profile = ({name,description,picture}) => {
  return (
    <div className="profile">
          <img
            className="display-picture"
            src={picture}
            alt="profile"
          />
          <div className="profile-details">
            <h4>{name}</h4>
            <span>{description}</span>
          </div>
        </div>
  )
}

export default Profile
