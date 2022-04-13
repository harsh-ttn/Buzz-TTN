import React, { useState, useEffect, useContext } from "react";
import axios from "../../../service/axios";
import { Avatar, Snackbar } from "@material-ui/core";
import { DataContext } from "../../../context/context";
import Comment from "./Comment";
import { Alert } from "@material-ui/lab";

const Comments = ({ id }) => {
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [comments, setComments] = useState([]);
  const { commentCreated, setCommentCreated } = useContext(DataContext);
  const [statusBar, setStatusBar] = useState({
    status: "success",
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "Creating Post ... ",
  });
  const { vertical, horizontal, open, status, message } = statusBar;

  useEffect(() => {
    const getComments = async () => {
      try {
        const comments = await axios.get(`/api/comments/${id}`, {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
        });
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
    if (comment.length < 1) {
      setStatusBar({
        status: "error",
        open: true,
        vertical: "top",
        horizontal: "center",
        message: "Comment cannot be empty",
      });
      return;
    }
    try {
      const sendComment = async () => {
        await axios.post(
          `/api/comments`,
          {
            postId: id,
            comment: comment,
            author: user.name,
            authorImage: user.userImage,
          },
          {
            headers: {
              "x-auth-token": JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        setComment("");
        setCommentCreated((p) => !p);
        console.log(`Comment Added`);
      };
      sendComment();
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

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
      <div
        style={{
          widht: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Avatar src={user.userImage} />
          <div style={{ flex: 1, padding: "10px 5px 0 10px" }}>
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
                  color: "black",
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
    </>
  );
};

export default Comments;
