import React, { useState } from "react";
import Sidenav from "../../../components/sidenav/Sidenav";
import "./Layout.css";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/people-connected.js";
import "@ui5/webcomponents-icons/dist/education.js";
import "@ui5/webcomponents-icons/dist/survey.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/log.js";
import "@ui5/webcomponents-icons/dist/add.js";
import { Avatar, NavigationLayout, ShellBar, ShellBarItem } from "@ui5/webcomponents-react";
import Mobilenav from "../../../components/mobilenav/Mobilenav";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = (props) => {
  const navigate = useNavigate();
  const handleSelectionChange = (e) => {
    const path = e.detail.item.text.toLowerCase();
    navigate(path === "home" ? "/" : path);
  };
  return (
    <NavigationLayout
      {...props}
      header={
        <ShellBar
          logo={
            <img
              alt="SAP Logo"
              src="https://sap.github.io/ui5-webcomponents/images/sap-logo-svg.svg"
            />
          }
          notificationsCount="10"
          onLogoClick={function Ki() {}}
          onMenuItemClick={function Ki() {}}
          onNotificationsClick={function Ki() {}}
          onProductSwitchClick={function Ki() {}}
          onProfileClick={function Ki() {}}
          onSearchButtonClick={function Ki() {}}
          primaryTitle="Scholar Onboarding Portal"
          profile={
            <Avatar>
              <img
                src="https://sap.github.io/ui5-webcomponents-react/v2/assets/Person-B7wHqdJw.png"
                alt="profile"
              />
            </Avatar>
          }
          showNotifications
        >
          <ShellBarItem icon="add" text="ShellBarItem" />
        </ShellBar>
      }
      sideContent={
        <>
          <div className="navigation-bar">
            <Sidenav handler={handleSelectionChange} />
          </div>
          <Mobilenav handler={handleSelectionChange} />
        </>
      }
    >
      <div className="outlet">
        <Outlet />
      </div>
    </NavigationLayout>
  );
};

export default Layout;
