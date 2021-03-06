import React, { useState, useEffect, useContext } from "react";
import { Avatar, AppBar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { Person, Textsms } from "@material-ui/icons";
import logo from "../assets/ttn-logo-name.png";
import { useNavigate } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import { DataContext } from "../context/context";
import PendingFriends from "./PendingFriends";
import "./components.css";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { postUpdated, setPostUpdated } = useContext(DataContext);
  var user = JSON.parse(localStorage.getItem("user-data"));

  const navigate = useNavigate();

  useEffect(() => {}, [postUpdated]);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const Logout = () => {
    localStorage.clear();
    navigate("/google");
  };

  return (
    <>
      <AppBar
        style={{
          position: "sticky",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          color: "black",
          padding: "0 30px",
          marginBottom: "30px",
        }}
      >
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="To the New Logo"
          width="80px"
        />
        <div className="header-items">
          <IconButton onClick={handleClick}>
            <Avatar
              style={{ height: "30px", width: "30px" }}
              src={user.userImage}
            />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={Logout}>
              <ExitToApp style={{ color: "peach" }} />
              Logout
            </MenuItem>
          </Menu>
          <p style={{ marginRight: 20 }}>{user.name}</p>
          <PendingFriends />
          <IconButton onClick={() => navigate("/profile")}>
            <Avatar style={{ height: "30px", width: "30px" }}>
              <Person style={{ width: 20, color: "black" }} />
            </Avatar>
          </IconButton>
        </div>
      </AppBar>
    </>
  );
};

export default Header;
