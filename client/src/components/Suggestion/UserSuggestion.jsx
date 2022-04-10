import React, { useEffect, useContext } from "react";
import { Paper, Avatar, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PersonAddOutlined } from "@material-ui/icons";

const UserSuggestion = ({ id, name }) => {
  return (
    <div>
      <Paper
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "10%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Avatar style={{ width: 35, height: 35, margin: "10px 15px" }} />
          <Link
            to={`/userDetail/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <p>{name}</p>
          </Link>
        </div>
        <IconButton>
          <p style={{ color: "blue", fontSize: "0.7rem", float: "right" }}>
            <PersonAddOutlined />
          </p>
        </IconButton>
      </Paper>
    </div>
  );
};

export default UserSuggestion;
