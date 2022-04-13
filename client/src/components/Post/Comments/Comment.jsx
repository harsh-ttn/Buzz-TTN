import React from "react";
import { Paper, Avatar } from "@material-ui/core";
import "./comments.css";

const Comment = ({ author, authorImage, comment, createdAt }) => {
  const PostDate = new Date(createdAt).toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  return (
    <Paper className="comment-container">
      <Avatar
        style={{ height: "2.5rem", width: "2.5rem", marginRight: "1.5rem" }}
        src={authorImage}
      />
      <div className="comment-text">
        <h6>
          {author} <span className="comment-text-date">{PostDate}</span>
        </h6>

        <p>{comment}</p>
      </div>
    </Paper>
  );
};

export default Comment;
