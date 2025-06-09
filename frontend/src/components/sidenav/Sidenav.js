import React, { useContext } from "react";
import { SideNavigationItem, SideNavigation } from "@ui5/webcomponents-react";
import { useLocation, useNavigate } from "react-router-dom";
import '@ui5/webcomponents-icons/dist/enablement.js';
import UserContext from "../../contexts/UserContext";

const Sidenav = ({ handler }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useContext(UserContext)
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="navigation-bar">
      <SideNavigation slot="sideContent" onSelectionChange={handler}>
        <SideNavigationItem text="Home" icon="home" selected={location.pathname === '/'} />
        <SideNavigationItem text="Connect" icon="people-connected" selected={location.pathname === '/connect'} />
        <SideNavigationItem text="Events" icon="calendar" selected={location.pathname === '/events'} />
        <SideNavigationItem text="Courses" icon="education" selected={location.pathname === '/courses'} />
        {user?.role !== 'Scholar' && <SideNavigationItem text="Accounts" icon="enablement" selected={location.pathname === '/accounts'} />}
        {user?.role !== 'Scholar' && <SideNavigationItem text="Forms" icon="survey" selected={location.pathname === '/forms'} />}
        {user?.role === 'Scholar' && <SideNavigationItem text="Forms" icon="survey" selected={location.pathname === '/forms/scholar'} />}
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
