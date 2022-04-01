import React from "react";
import { Paper, Avatar, TextField } from "@material-ui/core";
import { PhotoLibrary } from "@material-ui/icons";

const CreatePost = () => {
  return (
    <Paper
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
        <TextField
          label="Create a Post.."
          id="outlined-size-small"
          /* defaultValue="I am creating a post" */
          variant="outlined"
          size="small"
          style={{
            minWidth: "200px",
            width: "90%",
            backgroundColor: "lightgrey",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PhotoLibrary style={{ color: "green" }} />
        <p>Photo/Video</p>
      </div>
    </Paper>
  );
};

export default CreatePost;
