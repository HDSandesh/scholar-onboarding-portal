import React, { useEffect, useState } from "react";
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
import UserContext from "../../../contexts/UserContext";
import Mobilenav from "../../../components/mobilenav/Mobilenav";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = (props) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState()
  const handleSelectionChange = (e) => {
    const path = e.detail.item.text.toLowerCase();
    if (path === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      navigate("/login");
    } else {
      navigate(path === "home" ? "/" : `/${path}`);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUserInfo(userInfo);
    }

  }, [navigate]);
  return (
    <UserContext.Provider value={userInfo}>
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
                src="https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="profile"
              />
            </Avatar>
          }
          showNotifications
        >
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
    </UserContext.Provider>
  );
};

export default Layout;
