import React, { useEffect, useContext } from "react";
import { Paper, Avatar, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const UserSuggestion = ({ id, name }) => {
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
        <Link
          to={`/userDetail/${id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <p>{name}</p>
        </Link>
        <IconButton>
          <p style={{ color: "blue", fontSize: 12 }}> +Friened</p>
        </IconButton>
      </Paper>
    </div>
  );
};

export default UserSuggestion;
