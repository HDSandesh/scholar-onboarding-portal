import React from 'react'
import './Profile.css'
import { Avatar } from '@ui5/webcomponents-react'

const Profile = ({name,description,picture}) => {
  
  const getInitials = (name) => {
    const [firstName = '', lastName = ''] = name.trim().split(' ');
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="profile">
          {picture? <img
            className="display-picture"
            src={picture}
            alt="profile"
          />:<Avatar initials={getInitials(name)}/>}
          <div className="profile-details">
            <h4>{name}</h4>
            <span>{description}</span>
          </div>
        </div>
  )
}

export default Profile
