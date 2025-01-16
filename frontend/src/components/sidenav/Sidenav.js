import React from "react";
import { SideNavigationItem, SideNavigation } from "@ui5/webcomponents-react";
const Sidenav = ({ handler }) => {
  return (
    <div className="navigation-bar">
      <SideNavigation slot="sideContent" onSelectionChange={handler}>
        <SideNavigationItem text="Home" icon="home" />
        <SideNavigationItem text="Connect" icon="people-connected" />
        <SideNavigationItem text="Courses" icon="education" />
        <SideNavigationItem text="Forms" icon="survey" />
        <SideNavigationItem text="FAQ" icon="sys-help" />

        <SideNavigationItem
          slot="fixedItems"
          text="Logout"
          href="https://www.sap.com/about/legal/impressum.html"
          target="_blank"
          icon="log" 
        />
      </SideNavigation>
    </div>
  );
};

export default Sidenav;
