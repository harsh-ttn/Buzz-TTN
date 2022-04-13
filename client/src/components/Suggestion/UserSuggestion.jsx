import React, { useContext, useState } from "react";
import { Paper, Avatar, IconButton, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { PersonAddOutlined } from "@material-ui/icons";
import axios from "../../service/axios";
import { DataContext } from "../../context/context";
import "./suggestions.css";

const UserSuggestion = ({ id, name, userImage }) => {
  var user = JSON.parse(localStorage.getItem("user-data"));
  const { friend, setFriend } = useContext(DataContext);
  //snackabar
  const [statusBar, setStatusBar] = useState({
    status: "success",
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "Creating Post ... ",
  });
  const { vertical, horizontal, open, status, message } = statusBar;

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
      setStatusBar({
        status: "success",
        open: true,
        vertical: "bottom",
        horizontal: "center",
        message: `Friend request Sent to ${name}`,
      });
      /* console.log(`Friend req ${Data} ${res}`); */
    } catch (error) {
      console.log(`Error`, error);
    }
  };

  //snackbar close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatusBar(false);
  };

  return (
    <div>
      {status === "success" ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      )}
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
        <div className="us-container">
          <Avatar
            src={userImage}
            style={{ width: 35, height: 35, margin: "10px 15px" }}
          />
          <Link to={`/userprofile/${id}`} className="us-link">
            <p>{name}</p>
          </Link>
        </div>
        <IconButton onClick={sendFriendReq}>
          <p className="us-button">
            <PersonAddOutlined />
          </p>
        </IconButton>
      </Paper>
    </div>
  );
};

export default UserSuggestion;
