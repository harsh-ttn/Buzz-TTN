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
import axios from "../../service/axios";
import { DataContext } from "../../context/context";
import Comments from "./Comments/CreateComment";

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

  useEffect(() => {
    const getCommentCount = async () => {
      try {
        const res = await axios.get(`/api/commentsCount/${id}`);
        console.log(res.data);
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
        await axios.put(`/api/posts/${postId}`, {
          likes: postLikes + 1,
        });
        setLiked(true);
        setPostLikes((p) => p + 1);
        setPostCreated((p) => !p);
        if (disliked === true) {
          dislikePost(id, "no");
        }
        console.log("Post liked");
      } catch (error) {
        console.log(`Error ${error}`);
      }
    } else {
      try {
        await axios.put(`/api/posts/${postId}`, {
          likes: postLikes - 1,
        });
        setPostCreated((p) => !p);
        setLiked(false);
        setPostLikes((p) => p - 1);
        console.log("Post  unliked");
      } catch (error) {
        console.log(`Error ${error}`);
      }
    }
  };

  const dislikePost = async (postId, condition) => {
    if (condition === "yes") {
      try {
        await axios.put(`/api/posts/${postId}`, {
          dislikes: postDislikes + 1,
        });
        setDisliked(true);
        setPostDislikes((p) => p + 1);
        setPostCreated((p) => !p);
        if (liked === true) {
          likePost(id, "no");
        }
        console.log("Post disliked");
      } catch (error) {
        console.log(`Error ${error}`);
      }
    } else {
      try {
        await axios.put(`/api/posts/${postId}`, {
          dislikes: postDislikes - 1,
        });
        setPostCreated((p) => !p);
        setDisliked(false);
        setPostDislikes((p) => p - 1);
        console.log("Post undisliked");
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
      await axios.delete(`/api/posts/${postId}`);
      setPostCreated((p) => !p);
      console.log("Post deleted");
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  return (
    <div style={{ paddingTop: 15 }}>
      <Card>
        <div style={{ backgroundColor: "white" }}>
          <CardHeader
            style={{ padding: 10, display: "flex", flexWrap: "wrap" }}
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
                  <MenuItem onClick={() => deletePost(id)}>
                    <Report style={{ color: "darkgreen" }} />
                    Report
                  </MenuItem>

                  {user._id == authorId ? (
                    <MenuItem onClick={() => deletePost(id)}>
                      <Delete style={{ color: "darkred" }} />
                      Delete
                    </MenuItem>
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

        <p style={{ textAlign: "left", paddingLeft: 70, fontSize: "0.75rem" }}>
          {PostDate}
        </p>
        <p style={{ textAlign: "left", padding: 15, fontSize: "1.1rem" }}>
          {content}
        </p>
        {image === "" ? (
          <></>
        ) : (
          <CardMedia>
            <img src={image} alt="post-image" width="100%" />
          </CardMedia>
        )}
        <CardContent style={{ padding: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: 10,
                }}
              >
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

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {liked ? (
              <IconButton onClick={() => likePost(id, "no")}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ThumbUpAlt style={{ color: "blue" }} />
                  Like
                </div>
              </IconButton>
            ) : (
              <IconButton onClick={() => likePost(id, "yes")}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ThumbUpAltOutlined />
                  Like
                </div>
              </IconButton>
            )}
            {disliked ? (
              <IconButton onClick={() => dislikePost(id, "no")}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ThumbDownAlt style={{ color: "red" }} />
                  Dislike
                </div>
              </IconButton>
            ) : (
              <IconButton onClick={() => dislikePost(id, "yes")}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ThumbDownAltOutlined />
                  Dislike
                </div>
              </IconButton>
            )}

            <IconButton onClick={() => toggleComment()}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
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
