import React from 'react'
import "./UsersListView.css"
import { Card, Icon, Input } from '@ui5/webcomponents-react'
import Profile from '../../utils/profile/Profile'
const UsersListView = ({handler}) => {
    const handleClick = (event)=>{
        event.stopPropagation();
        event.currentTarget.classList.add('active')
        handler()
    }
  return (
        <div className='users-list-card'>
            <div className='users-list-card-header'>
                <Input type='Search' className='form-input' placeholder='Search Response' icon={<Icon name="search"/>}/>
            </div>
            <div className='users-list'>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="Sandesh" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="H DSandesh" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="Ashwin Prabhu" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="Paramashiv Karant" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="Jayanthi" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="Sneha" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="Krishnanand Bhat" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="H DSandesh" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="Ashwin Prabhu" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="Paramashiv Karant" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="Jayanthi" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="Sneha" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
                <div className='profile-container' onClick={(e)=>handleClick(e)}>
                    <Profile name="Krishnanand Bhat" picture={"https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description="01/04/2023 10:00AM"/>
                    <Icon name="navigation-right-arrow"/>
                </div>
            </div>
        </div>
  )
}

export default UsersListView
