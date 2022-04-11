import React, { useState } from "react";
import { Avatar, AppBar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { Person, Textsms } from "@material-ui/icons";
import logo from "../assets/ttn-logo-name.png";
import { useNavigate} from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";

const Header = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  var user = JSON.parse(localStorage.getItem("user-data"));

  const navigate = useNavigate();

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
        <img onClick={()=>navigate("/")} src={logo} alt="To the New Logo" width="80px" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
          <Avatar style={{ height: "30px", width: "30px", marginRight: 10 }}>
            <Textsms style={{ width: 15, color: "black" }} />
          </Avatar>
          <IconButton onClick={()=>navigate("/profile")}>
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
