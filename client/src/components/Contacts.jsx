import React from "react";
import { Paper, Avatar } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import UserContact from "./UserContact";

const Contacts = () => {
  return (
    <div style={{ marginBottom: 30 }}>
      <Paper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 15px",
          }}
        >
          <p>Contacts</p>
          <Avatar style={{ height: 25, width: 25 }}>
            <Search style={{ color: "black", width: 20 }} />
          </Avatar>
        </div>
        <div style={{ height: "32vh", overflowX: "hidden", overflowY: "auto" }}>
          <UserContact />
          <UserContact />
          <UserContact />
          <UserContact />
          <UserContact />
          <UserContact />
          <UserContact />
          <UserContact />
          <UserContact />
          <UserContact />
          <UserContact />
        </div>
      </Paper>
    </div>
  );
};

export default Contacts;
