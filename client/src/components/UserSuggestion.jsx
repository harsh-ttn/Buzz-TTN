import React from "react";
import { Paper, Avatar, IconButton } from "@material-ui/core";

const UserSuggestion = ({ name }) => {
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
        <p>{name}</p>
        <IconButton>
          <p style={{ color: "blue", fontSize: 12 }}> +Friened</p>
        </IconButton>
      </Paper>
    </div>
  );
};

export default UserSuggestion;
