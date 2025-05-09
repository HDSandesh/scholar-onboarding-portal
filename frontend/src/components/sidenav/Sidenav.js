import React from "react";
import { SideNavigationItem, SideNavigation } from "@ui5/webcomponents-react";
import { useLocation, useNavigate } from "react-router-dom";
import '@ui5/webcomponents-icons/dist/enablement.js';

const Sidenav = ({ handler }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="navigation-bar">
      <SideNavigation slot="sideContent" onSelectionChange={handler}>
        <SideNavigationItem text="Home" icon="home" selected={location.pathname === '/'} />
        <SideNavigationItem text="Connect" icon="people-connected" selected={location.pathname === '/connect'} />
        <SideNavigationItem text="Courses" icon="education" selected={location.pathname === '/courses'} />
        <SideNavigationItem text="Accounts" icon="enablement" selected={location.pathname === '/accounts'} />
        <SideNavigationItem text="Forms" icon="survey" selected={location.pathname === '/forms'} />
        <SideNavigationItem text="FAQ" icon="sys-help" selected={location.pathname === '/faq'} />

        <SideNavigationItem
          slot="fixedItems"
          text="Logout"
          icon="log"
          onClick={handleLogout} // Call logout function
        />
      </SideNavigation>
    </div>
  );
};

export default Sidenav;
