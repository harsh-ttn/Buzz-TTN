import React, { useContext } from "react";
import { Paper, Avatar, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PersonAddOutlined } from "@material-ui/icons";
import axios from "../../service/axios";
import { DataContext } from "../../context/context";

const UserSuggestion = ({ id, name, userImage }) => {
  var user = JSON.parse(localStorage.getItem("user-data"));
  const { friend, setFriend } = useContext(DataContext);

  const Data = {
    userId: id,
    friendId: user._id,
    friendName: user.name,
    friendImage: user.userImage,
    status: "pending",
  };

  const sendFriendReq = async () => {
    try {
      const res = await axios.post(`/api/friends`, Data, {
        headers: {
          "x-auth-token": JSON.parse(localStorage.getItem("token")),
        },
      });
      setFriend((p) => !p);
      console.log(`Friend req ${Data} ${res}`);
    } catch (error) {
      console.log(`Error`, error);
    }
  };

  return (
    <div>
      <Paper
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
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
          <Avatar
            src={userImage}
            style={{ width: 35, height: 35, margin: "10px 15px" }}
          />
          <Link
            to={`/userprofile/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <p>{name}</p>
          </Link>
        </div>
        <IconButton onClick={sendFriendReq}>
          <p style={{ color: "#2b7fd3", fontSize: "0.7rem", float: "right" }}>
            <PersonAddOutlined />
          </p>
        </IconButton>
      </Paper>
    </div>
  );
};

export default UserSuggestion;
