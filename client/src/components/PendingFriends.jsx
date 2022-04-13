import React, { useState, useEffect, useContext } from "react";
import axios from "../service/axios";
import {
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Badge,
  Snackbar,
} from "@material-ui/core";
import { Textsms } from "@material-ui/icons";
import { DataContext } from "../context/context";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const PendingFriends = () => {
  const [users, setUsers] = useState([]);
  var user = JSON.parse(localStorage.getItem("user-data"));
  const [a, setA] = useState(null);
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

  const handleClick1 = (e) => {
    setA(e.currentTarget);
  };
  const handleClose1 = (e) => {
    setA(null);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          `/api/friends?userId=${user._id}&status=pending`,
          {
            headers: {
              "x-auth-token": JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        /* console.log("Pending users", res.data.data); */
        setUsers(res.data.data);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getUsers();
  }, [friend]);

  const acceptFriendReq = async (friendId, friendName) => {
    try {
      const res = await axios.post(
        `/api/confirmfriends?userId=${user._id}&friendId=${friendId}&friendName=${user.name}&friendImage=${user.userImage}`,
        { status: "friends" },
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      /* console.log("Accepted Request", res.data.data); */
      setFriend((p) => !p);
      setStatusBar({
        status: "success",
        open: true,
        vertical: "top",
        horizontal: "center",
        message: `${friendName} is now your friend`,
      });
    } catch (error) {
      console.log(`Error ${error}`);
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
    <>
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
      <IconButton onClick={handleClick1}>
        <Badge badgeContent={users.length} color="error">
          <Avatar style={{ height: "30px", width: "30px", marginRight: 10 }}>
            <Textsms style={{ width: 15, color: "black" }} />
          </Avatar>
        </Badge>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={a}
        keepMounted
        open={Boolean(a)}
        onClose={handleClose1}
      >
        {users.length > 0 ? (
          <>
            {users.map((user) => (
              <MenuItem key={user.friendId}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={user.friendImage}
                    style={{ width: 35, height: 35, margin: "10px 15px" }}
                  />
                  <Link
                    to={`/userprofile/${user.friendId}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p>{user.friendName}</p>
                  </Link>
                </div>
                <IconButton
                  onClick={() =>
                    acceptFriendReq(user.friendId, user.friendName)
                  }
                >
                  <p
                    style={{
                      color: "#2b7fd3",
                      fontSize: "0.7rem",
                      float: "right",
                    }}
                  >
                    Accept
                  </p>
                </IconButton>
              </MenuItem>
            ))}
          </>
        ) : (
          <MenuItem>No Messages</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default PendingFriends;
