import { React, useState } from "react";
import UsersListView from "../../../components/userslistview/UsersListView";
import "./Connect.css";
import { Card } from "@ui5/webcomponents-react";
import MessageView  from '../../../components/messageview/MessageView'
const Connect = () => {
  const [viewResponse, setViewResponse] = useState(false);

  return (
    <Card>
      <div className="connect-card">
        <div className="users-list-view">
          <UsersListView
            viewResponse={viewResponse}
            handler={() => {
              setViewResponse(true);
            }}
            />
        </div>
        <div className="section-seperator"></div>
          <MessageView viewResponse={viewResponse} handler={() => {
            setViewResponse(false);
          }}/>
        </div>
    </Card>
  );
};

export default Connect;
