import React, { useState, useRef, useContext } from "react";
import { Paper, Avatar, IconButton } from "@material-ui/core";
import { PhotoLibrary } from "@material-ui/icons";
import axios from "axios";
import { DataContext } from "../context/context";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    content: "",
    image: "",
    author: "Harsh",
  });
  let { content, image, author } = formData;
  const { postCreated, setPostCreated } = useContext(DataContext);

  const contentRef = useRef();

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/posts", formData);
      console.log("Post Created", formData);
      setPostCreated((p) => !p);
      contentRef.current.value = "";
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
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
          <input
            ref={contentRef}
            type="text"
            name="content"
            placeholder="Start a post..."
            id="content"
            value={content}
            onChange={onChange}
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
        <IconButton>
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
        </IconButton>
        <button type="submit"></button>
      </Paper>
    </form>
  );
};

export default CreatePost;
