import React, { useEffect } from "react";
import { SideNavigationItem, SideNavigation } from "@ui5/webcomponents-react";
import { useLocation } from "react-router-dom";
import '@ui5/webcomponents-icons/dist/enablement.js'
const Sidenav = ({ handler }) => {
  const location = useLocation();
  useEffect(()=>{
    console.log(location.pathname)
  },[])
  return (
    <div className="navigation-bar">
      <SideNavigation slot="sideContent" onSelectionChange={handler}>
        <SideNavigationItem text="Home" icon="home" selected={location.pathname==='/'}/>
        <SideNavigationItem text="Connect" icon="people-connected" selected={location.pathname==='/connect'} />
        <SideNavigationItem text="Courses" icon="education" selected={location.pathname==='/courses'}/>
        <SideNavigationItem text="Accounts" icon="enablement" selected={location.pathname==='/accounts'}/>
        <SideNavigationItem text="Forms" icon="survey" selected={location.pathname==='/forms'}/>
        <SideNavigationItem text="FAQ" icon="sys-help" selected={location.pathname==='/faq'}/>

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
