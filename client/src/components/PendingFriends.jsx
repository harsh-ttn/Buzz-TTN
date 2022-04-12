import React, { useState, useEffect, useContext } from "react";
import axios from "../service/axios";
import { Menu, MenuItem, Avatar, IconButton, Badge } from "@material-ui/core";
import { Textsms } from "@material-ui/icons";
import { DataContext } from "../context/context";
import { Link } from "react-router-dom";

const PendingFriends = () => {
  const [users, setUsers] = useState([]);
  var user = JSON.parse(localStorage.getItem("user-data"));
  const [a, setA] = useState(null);
  const { friend, setFriend } = useContext(DataContext);

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
          `/api/friends?userId=${user._id}&status=pending`
        );
        console.log("Pending users", res.data.data);
        setUsers(res.data.data);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getUsers();
  }, [friend]);

  const acceptFriendReq = async (friendId) => {
    try {
      const res = await axios.post(
        `/api/confirmfriends?userId=${user._id}&friendId=${friendId}`,
        { status: "friends" }
      );
      console.log("Accepted Request", res.data.data);
      setFriend((p) => !p);
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  return (
    <>
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
              <MenuItem>
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
                <IconButton onClick={() => acceptFriendReq(user.friendId)}>
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
