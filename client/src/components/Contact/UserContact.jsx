import React from "react";
import { Paper, Avatar, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./contacts.css";

const UserContact = ({ id, name, userImage }) => {
  return (
    <div>
      <Paper className="uc-container">
        <Avatar
          style={{ width: 35, height: 35, margin: "10px 15px" }}
          src={userImage}
        />
        <Link
          to={`/userprofile/${id}`}
          className="uc-link"
        >
          <p>{name}</p>
        </Link>
      </Paper>
    </div>
  );
};

export default UserContact;
