import React, { useEffect, useState } from "react";
import Sidenav from "../../../components/sidenav/Sidenav";
import './Homepage.css'
import '@ui5/webcomponents-icons/dist/home.js'
import '@ui5/webcomponents-icons/dist/locate-me.js'
import '@ui5/webcomponents-icons/dist/people-connected.js'
import '@ui5/webcomponents-icons/dist/education.js'
import '@ui5/webcomponents-icons/dist/survey.js'
import '@ui5/webcomponents-icons/dist/sys-help.js'
import '@ui5/webcomponents-icons/dist/log.js'
import {
    Avatar,
  NavigationLayout,
  ShellBar,
  Text,
  Title,
} from "@ui5/webcomponents-react";
import Mobilenav from "../../../components/mobilenav/Mobilenav";
import { useNavigate } from "react-router-dom";

const Homepage = (props) => {
  const [selectedContent, setSelectedContent] = useState("Home");
  const navigate = useNavigate()
  const handleSelectionChange = (e) => {
    setSelectedContent(e.detail.item.text);
    navigate(e.detail.item.text.toLowerCase())
  };

  return (
    <div>
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
                <img src="https://sap.github.io/ui5-webcomponents-react/v2/assets/Person-B7wHqdJw.png" />
              </Avatar>
            }
            showNotifications
          >
          </ShellBar>
        }
        sideContent={
            <>
            <div className="navigation-bar">
                <Sidenav handler={handleSelectionChange}/>
            </div>
                <Mobilenav handler={handleSelectionChange}/>
            </>
        }
      >
        <div style={{ padding: "1rem" }}>
          <div>
            <Title>{selectedContent}</Title>
            <br />
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </div>
        </div>
      </NavigationLayout>
    </div>
  );
};

export default Homepage;
