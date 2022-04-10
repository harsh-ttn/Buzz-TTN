import React from "react";
import { Paper, Avatar } from "@material-ui/core";

const Comment = ({ author, authorImage, comment, createdAt }) => {
  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Avatar src={authorImage} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <h6>{author}</h6>

        <p>{comment}</p>
      </div>
    </Paper>
  );
};

export default Comment;
