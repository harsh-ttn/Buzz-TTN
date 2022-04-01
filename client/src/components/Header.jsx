import React from "react";
import { Avatar, AppBar } from "@material-ui/core";
import { Person, Textsms } from "@material-ui/icons";

const Header = () => {
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
        }}
      >
        <img
          src="https://i.imgur.com/DKV9GN7.png"
          alt="To the New Logo"
          width="80px"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Avatar style={{ height: "30px", width: "30px" }} />
          <p style={{ margin: "0 20px 0 10px" }}>Username</p>
          <Avatar style={{ height: "30px", width: "30px", marginRight: 10 }}>
            <Textsms />
          </Avatar>
          <Avatar style={{ height: "30px", width: "30px" }}>
            <Person />
          </Avatar>
        </div>
      </AppBar>
    </>
  );
};

export default Header;
