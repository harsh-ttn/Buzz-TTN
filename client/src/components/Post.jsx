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
  CommentSharp,
  Delete,
  Edit,
} from "@material-ui/icons";
import axios from "axios";
import { DataContext } from "../context/context";

const Post = ({
  id,
  content,
  image,
  author,
  likes,
  dislikes,
  comments,
  createdAt,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { postCreated, setPostCreated } = useContext(DataContext);
  const [postLikes, setPostLikes] = useState(likes);
  const [postDislikes, setPostDislikes] = useState(dislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  /* const updatePost = async (postId) => {
    try {
      await axios.put(`http://localhost:8080/api/posts/${postId}`);
    } catch (error) {
      console.log(`Error ${error}`);
    }
  }; */

  const likePost = async (postId, condition) => {
    if (condition === "yes") {
      try {
        await axios.put(`http://localhost:8080/api/posts/${postId}`, {
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
        await axios.put(`http://localhost:8080/api/posts/${postId}`, {
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
        await axios.put(`http://localhost:8080/api/posts/${postId}`, {
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
        await axios.put(`http://localhost:8080/api/posts/${postId}`, {
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
      await axios.delete(`http://localhost:8080/api/posts/${postId}`);
      setPostCreated((p) => !p);
      console.log("Post deleted");
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  return (
    <div style={{ paddingTop: 15 }}>
      <Card>
        <div style={{ backgroundColor: "#f4f5ff" }}>
          <CardHeader
            style={{ padding: 10 }}
            avatar={<Avatar />}
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
                  {/* <MenuItem onClick={() => updatePost(id)}>
                  <Edit style={{ color: "purple" }} />
                  Update
                </MenuItem> */}
                  <MenuItem onClick={() => deletePost(id)}>
                    <Delete style={{ color: "red" }} />
                    Delete
                  </MenuItem>
                </Menu>
              </>
            }
            titleTypographyProps={{ variant: "h6" }}
            title={author}
            subheader={createdAt}
          />
        </div>

        <p style={{ textAlign: "left", padding: 15, fontSize: 16 }}>
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
            <p>{comments.length} comment</p>
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
            <>
              <Divider />
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
                  <input
                    type="text"
                    name="comment"
                    placeholder="Write a comment..."
                    id="comment"
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
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
