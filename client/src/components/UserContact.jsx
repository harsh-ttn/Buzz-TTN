import React from "react";
import { Paper, Avatar } from "@material-ui/core";

const UserContact = () => {
  return (
    <div>
      <Paper
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingRight: "20%",
        }}
      >
        <Avatar style={{ width: 35, height: 35, margin: "10px 0" }} />
        <p>Username</p>
      </Paper>
    </div>
  );
};

export default UserContact;
