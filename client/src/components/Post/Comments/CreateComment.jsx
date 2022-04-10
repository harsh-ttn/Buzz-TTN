import React, { useState, useEffect, useContext } from "react";
import axios from "../../../service/axios";
import { Avatar } from "@material-ui/core";
import { DataContext } from "../../../context/context";
import Comment from "./Comment";

const Comments = ({ id }) => {
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [comments, setComments] = useState([]);
  const { commentCreated, setCommentCreated } = useContext(DataContext);

  useEffect(() => {
    const getComments = async () => {
      try {
        const comments = await axios.get(`/api/comments/${id}`);
        console.log(comments.data);
        setComments(comments.data.data);
      } catch (error) {
        console.log(`Error`, error);
      }
    };
    getComments();
  }, [commentCreated]);

  const createComment = async (e) => {
    e.preventDefault();
    try {
      const sendComment = async () => {
        await axios.post(`/api/comments`, {
          postId: id,
          comment: comment,
          author: user.name,
          authorImage: user.userImage,
        });
        setComment("");
        setCommentCreated((p) => !p);
        console.log(`Comment Added`);
      };
      sendComment();
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  return (
    <div
      style={{
        widht: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Avatar />
        <div style={{ flex: 1, padding: "0 5px 0 10px" }}>
          <form
            onSubmit={(e) => {
              createComment(e, id);
            }}
          >
            <input
              type="text"
              name="comment"
              placeholder="Write a comment..."
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                minWidth: "200px",
                width: "90%",
                backgroundColor: "lightgrey",
                border: "none",
                borderRadius: "10px",
                outline: "none",
                padding: 12,
              }}
            />
          </form>
        </div>
      </div>
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            author={comment.author}
            authorImage={comment.authorImage}
            comment={comment.comment}
            createdAt={comment.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
