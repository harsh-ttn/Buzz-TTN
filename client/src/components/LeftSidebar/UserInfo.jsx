import React, { useState, useEffect, useContext } from "react";
import { Card, CardMedia, CardContent, Avatar } from "@material-ui/core";
import userInfoBg from "../../assets/user-info-bg.jpg";
import axios from "../../service/axios";
import { DataContext } from "../../context/context";

const UserInfo = () => {
  const [postCount, setPostCount] = useState(0);
  var user = JSON.parse(localStorage.getItem("user-data"));
  const { postCreated, setPostCreated } = useContext(DataContext);

  useEffect(() => {
    const getPostCount = async () => {
      try {
        const res = await axios.get(`/api/postsCount/${user._id}`, {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
        });
        /* console.log(res.data); */
        setPostCount(res.data.data);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getPostCount();
  }, [postCreated]);

  return (
    <Card style={{ marginBottom: 30 }}>
      <CardMedia style={{ position: "relative" }}>
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
        <div style={{ padding: "20px 0" }}>
          <h4>{user.name}</h4>
          <p>{user.designation ? user.designation : "Role"} in TTN</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <p>{postCount * 10}</p>
            <p>Post Views</p>
          </div>
          <div style={{ border: "1px solid grey" }}></div>
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
