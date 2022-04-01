import React from "react";
import { Paper, Avatar } from "@material-ui/core";

const UserSuggestion = () => {
  return (
    <div>
      <Paper
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingRight: "10%",
        }}
      >
        <Avatar style={{ width: 35, height: 35, margin: "10px 0" }} />
        <p>Username</p>
        <p style={{ color: "blue", fontSize: 12 }}> +Friened</p>
      </Paper>
    </div>
  );
};

export default UserSuggestion;
