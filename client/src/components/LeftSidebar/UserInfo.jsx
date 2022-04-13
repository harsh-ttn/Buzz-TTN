import React, { useState, useEffect, useContext } from "react";
import { Card, CardMedia, CardContent, Avatar } from "@material-ui/core";
import userInfoBg from "../../assets/user-info-bg.jpg";
import axios from "../../service/axios";
import { DataContext } from "../../context/context";
import "./leftSidebar.css";

const UserInfo = () => {
  const [postCount, setPostCount] = useState(0);
  const [friendCount, setFriendCount] = useState(1);
  var user = JSON.parse(localStorage.getItem("user-data"));
  const { postCreated, setPostCreated } = useContext(DataContext);

  useEffect(() => {
    const getCount = async () => {
      try {
        const res = await axios.get(`/api/postsCount/${user._id}`, {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
        });
        setPostCount(res.data.data);
        const res1 = await axios.get(`/api/friendsCount/${user._id}`, {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
        });
        setFriendCount(res1.data.data);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getCount();
  }, [postCreated]);

  return (
    <Card className="ui-card-container">
      <CardMedia className="ui-card-media">
        <img src={userInfoBg} alt="user-info-bg" width="100%" />
        <Avatar
          style={{
            height: "70px",
            width: "70px",
            position: "absolute",
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -30%)",
            border: "3px solid white",
          }}
          src={user.userImage}
        />
      </CardMedia>

      <CardContent>
        <div className="ui-card-content">
          <h4>{user.name}</h4>
          <p>{user.designation ? user.designation : "Role"} in TTN</p>
        </div>

        <div className="ui-counts">
          <div>
            <p>{friendCount * postCount}</p>
            <p>Post Views</p>
          </div>
          <div className="ui-counts-line"></div>
          <div>
            <p>{postCount}</p>
            <p>Posts</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
