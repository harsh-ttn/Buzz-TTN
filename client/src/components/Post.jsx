import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  TextField,
} from "@material-ui/core";
import {
  MoreVert,
  ThumbUpAltOutlined,
  ThumbUpAlt,
  ThumbDownAltOutlined,
  ThumbDownAlt,
  CommentOutlined,
  CommentSharp,
} from "@material-ui/icons";

const Post = ({
  content,
  image,
  author,
  likes,
  dislikes,
  comments,
  createdAt,
}) => {
  return (
    <div style={{ padding: "15px 0" }}>
      <Card>
        <CardHeader
          avatar={<Avatar />}
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          titleTypographyProps={{ variant: "h6" }}
          title={author}
          subheader={createdAt}
        />

        <p style={{ textAlign: "left", padding: " 0 10px 10px 20px" }}>
          {content}
        </p>

        <CardMedia>
          <img src={image} alt="post-image" width="100%" />
        </CardMedia>

        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
              padding: "10px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ThumbUpAltOutlined />
              Like
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ThumbDownAltOutlined />
              Dislike
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CommentOutlined />
              Comment
            </div>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <Avatar />
            <div style={{ flex: 1, padding: "0 5px 0 10px" }}>
              <TextField
                label="Write a comment.."
                id="outlined-size-small"
                variant="outlined"
                size="small"
                style={{
                  minWidth: "200px",
                  width: "90%",
                  backgroundColor: "lightgrey",
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
