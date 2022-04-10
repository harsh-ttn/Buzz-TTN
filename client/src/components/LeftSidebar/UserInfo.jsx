import React from "react";
import { Card, CardMedia, CardContent, Avatar } from "@material-ui/core";
import userInfoBg from "../../assets/user-info-bg.jpg";

const UserInfo = ({ user }) => {
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
          <p>Role in TTN</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <p>234</p>
            <p>Post Views</p>
          </div>
          <div style={{ border: "1px solid grey" }}></div>
          <div>
            <p>10</p>
            <p>Post</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
