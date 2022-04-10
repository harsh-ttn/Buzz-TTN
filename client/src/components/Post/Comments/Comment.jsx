import React from "react";
import { Paper, Avatar } from "@material-ui/core";

const Comment = ({ author, authorImage, comment, createdAt }) => {
  const PostDate = new Date(createdAt).toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "0.7rem 2rem",
      }}
    >
      <Avatar
        style={{ height: "2.5rem", width: "2.5rem", marginRight: "1.5rem" }}
        src={authorImage}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <h6>
          {author}{" "}
          <span style={{ fontSize: "0.7rem", fontWeight: "normal" }}>
            {PostDate}
          </span>
        </h6>

        <p>{comment}</p>
      </div>
    </Paper>
  );
};

export default Comment;
