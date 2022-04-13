import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  TextField,
  Menu,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import {
  MoreVert,
  ThumbUpAltOutlined,
  ThumbUpAlt,
  ThumbDownAltOutlined,
  ThumbDownAlt,
  CommentOutlined,
  Report,
  Delete,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import axios from "../../service/axios";
import { DataContext } from "../../context/context";
import Comments from "./Comments/CreateComment";
import Modal from "../Modal";
import "./posts.css";

const Post = ({
  id,
  content,
  image,
  author,
  authorId,
  authorImage,
  likes,
  dislikes,
  createdAt,
  moderator,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { postCreated, setPostCreated, commentCreated, setCommentCreated } =
    useContext(DataContext);
  const [postLikes, setPostLikes] = useState(likes);
  const [postDislikes, setPostDislikes] = useState(dislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const PostDate = new Date(createdAt).toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  var user = JSON.parse(localStorage.getItem("user-data"));
  const [statusBar, setStatusBar] = useState({
    status: "success",
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "Creating Post ... ",
  });
  const { vertical, horizontal, open, status, message } = statusBar;

  useEffect(() => {
    const getCommentCount = async () => {
      try {
        const res = await axios.get(`/api/commentsCount/${id}`, {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
        });
        setCommentCount(res.data.data);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getCommentCount();
  }, [commentCreated]);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const likePost = async (postId, condition) => {
    if (condition === "yes") {
      try {
        await axios.put(
          `/api/posts/${postId}`,
          {
            likes: postLikes + 1,
          },
          {
            headers: {
              "x-auth-token": JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        setLiked(true);
        setPostLikes((p) => p + 1);
        setPostCreated((p) => !p);
        if (disliked === true) {
          dislikePost(id, "no");
        }
      } catch (error) {
        console.log(`Error ${error}`);
      }
    } else {
      try {
        await axios.put(
          `/api/posts/${postId}`,
          {
            likes: postLikes - 1,
          },
          {
            headers: {
              "x-auth-token": JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        setPostCreated((p) => !p);
        setLiked(false);
        setPostLikes((p) => p - 1);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    }
  };

  const dislikePost = async (postId, condition) => {
    if (condition === "yes") {
      try {
        await axios.put(
          `/api/posts/${postId}`,
          {
            dislikes: postDislikes + 1,
          },
          {
            headers: {
              "x-auth-token": JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        setDisliked(true);
        setPostDislikes((p) => p + 1);
        setPostCreated((p) => !p);
        if (liked === true) {
          likePost(id, "no");
        }
      } catch (error) {
        console.log(`Error ${error}`);
      }
    } else {
      try {
        await axios.put(
          `/api/posts/${postId}`,
          {
            dislikes: postDislikes - 1,
          },
          {
            headers: {
              "x-auth-token": JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        setPostCreated((p) => !p);
        setDisliked(false);
        setPostDislikes((p) => p - 1);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    }
  };

  const toggleComment = () => {
    setOpenComment((p) => !p);
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: {
          "x-auth-token": JSON.parse(localStorage.getItem("token")),
        },
      });
      setStatusBar({
        status: "success",
        open: true,
        vertical: "top",
        horizontal: "center",
        message: "Post Deleted ...",
      });
      handleClose();

      setPostCreated((p) => !p);
    } catch (error) {
      setStatusBar({
        status: "error",
        open: true,
        vertical: "top",
        horizontal: "center",
        message: "Erro deleting Post ...",
      });
    }
  };
  const reportPost = async () => {
    handleClose();
    setStatusBar({
      status: "success",
      open: true,
      vertical: "top",
      horizontal: "center",
      message: "Post reported...",
    });
  };

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatusBar(false);
  };

  return (
    <div style={{ paddingTop: 15 }}>
      {status === "success" ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose1}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose1} severity="success">
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose1}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose1} severity="error">
            {message}
          </Alert>
        </Snackbar>
      )}
      <Card>
        <div>
          <CardHeader
            className="post-cardheader"
            avatar={<Avatar src={authorImage} />}
            action={
              <>
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreVert />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {user._id !== authorId ? (
                    <>
                      <MenuItem>
                        <Modal
                          message="Report"
                          modalHeader="Confirmation !"
                          modalMessage="Do you want to report the post"
                          func={reportPost}
                          id={id}
                        />
                        <Report className="post-report" />
                      </MenuItem>
                    </>
                  ) : (
                    <></>
                  )}

                  {user._id === authorId ||
                  (user.moderator === true && moderator === true) ? (
                    <>
                      <MenuItem>
                        <Modal
                          message="Delete"
                          modalHeader="Confirmation !"
                          modalMessage="Do you want to delete the post"
                          func={deletePost}
                          id={id}
                        />
                        <Delete className="post-delete" />
                      </MenuItem>
                    </>
                  ) : (
                    <></>
                  )}
                </Menu>
              </>
            }
            titleTypographyProps={{
              style: { fontSize: "1.3rem", float: "left" },
            }}
            title={author}
          />
        </div>

        <p className="post-date">{PostDate}</p>
        <p className="post-content">{content}</p>
        {image === "" ? (
          <></>
        ) : (
          <CardMedia>
            <img src={image} alt="post-image" width="100%" />
          </CardMedia>
        )}
        <CardContent style={{ padding: 0 }}>
          <div className="post-cardcontent">
            <div className="post-numbers">
              <div className="post-numbers-like">
                <Avatar
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: "lightblue",
                  }}
                >
                  <ThumbUpAlt style={{ width: 15 }} />
                </Avatar>
                <p>{likes}</p>
              </div>

              <div className="post-numbers-like">
                <Avatar
                  style={{ width: 25, height: 25, backgroundColor: "pink" }}
                >
                  <ThumbDownAlt style={{ width: 15 }} />
                </Avatar>
                <p>{dislikes}</p>
              </div>
            </div>

            <p>{commentCount} comments</p>
          </div>
          <Divider />
          <div className="post-like">
            {liked ? (
              <IconButton onClick={() => likePost(id, "no")}>
                <div className="post-button">
                  <ThumbUpAlt style={{ color: "blue" }} />
                  Like
                </div>
              </IconButton>
            ) : (
              <IconButton onClick={() => likePost(id, "yes")}>
                <div className="post-button">
                  <ThumbUpAltOutlined />
                  Like
                </div>
              </IconButton>
            )}
            {disliked ? (
              <IconButton onClick={() => dislikePost(id, "no")}>
                <div className="post-button">
                  <ThumbDownAlt style={{ color: "red" }} />
                  Dislike
                </div>
              </IconButton>
            ) : (
              <IconButton onClick={() => dislikePost(id, "yes")}>
                <div className="post-button">
                  <ThumbDownAltOutlined />
                  Dislike
                </div>
              </IconButton>
            )}

            <IconButton onClick={() => toggleComment()}>
              <div className="post-button">
                <CommentOutlined />
                Comment
              </div>
            </IconButton>
          </div>

          {openComment ? (
            <div style={{ width: "100%" }}>
              <Divider />
              <Comments id={id} />
            </div>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
