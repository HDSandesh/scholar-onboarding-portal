import React from 'react'
import { Icon } from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/home.js'
import '@ui5/webcomponents-icons/dist/locate-me.js'
import '@ui5/webcomponents-icons/dist/people-connected.js'
import '@ui5/webcomponents-icons/dist/education.js'
import '@ui5/webcomponents-icons/dist/survey.js'
import '@ui5/webcomponents-icons/dist/log.js'
import "@ui5/webcomponents-icons/dist/person-placeholder.js"

import './Mobilenav.css'
import { NavLink } from 'react-router-dom';
const Mobilenav = () => {
    return (
        <div className='mobile-nav'>
            <div className='nav-group'>
                <NavLink to="" className='nav-link'>
                    <Icon name="home" className='icon' />
                    <div className='nav-label'>Home</div>
                </NavLink>
                <NavLink to="connect" className='nav-link'>
                    <Icon name="people-connected" className='icon' />
                    <div className='nav-label'>Connect</div>
                </NavLink>
                <NavLink to="post" className='nav-link'>
                    <Icon name="person-placeholder" className='icon' />
                    <div className='nav-label'>Post</div>
                </NavLink>
                <NavLink to="courses" className='nav-link'>
                    <Icon name="education" className='icon' />
                    <div className='nav-label'>Courses</div>
                </NavLink>
                <NavLink to="forms" className='nav-link'>
                    <Icon name="survey" className='icon' />
                    <div className='nav-label'>Forms</div>
                </NavLink>
            </div>
        </div>
    )
}

export default Mobilenav
