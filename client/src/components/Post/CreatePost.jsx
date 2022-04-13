import React, { useState, useRef, useContext, useEffect } from "react";
import { Paper, Avatar, IconButton, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { PhotoLibrary } from "@material-ui/icons";
import axios from "../../service/axios";
import { DataContext } from "../../context/context";
import "./posts.css";

const initialState = {
  content: "",
  image: "",
  author: "Harsh",
  authorImage: "",
  authorId: "",
};
const CreatePost = () => {
  const [formData, setFormData] = useState(initialState);
  let { content, image, author } = formData;
  const { postCreated, setPostCreated } = useContext(DataContext);
  //cloudinray
  const [fileInput, setFileInput] = useState("");
  const [fileName, setFileName] = useState("");
  //
  const user = JSON.parse(localStorage.getItem("user-data"));

  //snackabar
  const [statusBar, setStatusBar] = useState({
    status: "success",
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "Creating Post ... ",
  });
  const { vertical, horizontal, open, status, message } = statusBar;

  const fileRef = useRef();

  //set post values
  const onChange = (e) => {
    if (user)
      setFormData((prev) => ({
        ...prev,
        ["author"]: user.name,
        ["authorImage"]: user.userImage,
        ["authorId"]: user._id,
      }));
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //submit post
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (user) setFormData((prev) => ({ ...prev, ["author"]: user.name }));
    if (content.length < 3) {
      setStatusBar({
        status: "error",
        open: true,
        vertical: "top",
        horizontal: "center",
        message: "Post length is too short ...",
      });
      setFormData(initialState);
      return;
    }
    try {
      setStatusBar({
        status: "success",
        open: true,
        vertical: "top",
        horizontal: "center",
        message: "Creating Post ... ",
      });
      await axios.post("/api/posts", formData, {
        headers: {
          "x-auth-token": JSON.parse(localStorage.getItem("token")),
        },
      });
      setFileInput("");
      setFileName("");
      setFormData(initialState);
      setStatusBar({
        status: "success",
        open: false,
        vertical: "top",
        horizontal: "center",
        message: "Creating Post ... ",
      });
      setPostCreated((p) => !p);
    } catch (error) {
      setStatusBar({
        status: "error",
        open: true,
        vertical: "top",
        horizontal: "center",
        message: { error },
      });
    }
  };

  //cloudinary
  const handleFileInputChange = (e) => {
    console.log(e.target.files[0]);
    if (!e.target.files[0].type.includes("image")) {
      setFileName("Not an Image or Gif");
      setStatusBar({
        status: "error",
        open: true,
        vertical: "top",
        horizontal: "center",
        message: "You can only add Images or Gifs",
      });
      setFileInput("");
      return;
    }
    if (e.target.files[0].size > 5000000) {
      setFileName("Image size greater than 5mb");
      setStatusBar({
        status: "error",
        open: true,
        vertical: "top",
        horizontal: "center",
        message: "Image size greater than 5mb",
      });
      setFileInput("");
      return;
    }
    const file = e.target.files[0];
    previewFile(file);
    setFileInput(e.target.value);
    setFileName(e.target.files[0].name);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    console.log("reader", reader);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, ["image"]: reader.result }));
    };
  };
  //

  const handleFile = () => {
    fileRef.current.click();
  };

  //snackbar close
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
          autoHideDuration={3000}
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

      <form onSubmit={onFormSubmit}>
        <Paper className="postCreate-container">
          <Avatar src={user.userImage} />
          <div className="postCreate-input-container">
            <input
              type="text"
              name="content"
              placeholder="Start a post..."
              id="content"
              value={content}
              onChange={onChange}
              className="postCreate-input"
            />
          </div>
          <div className="postCreate-image-container">
            <IconButton onClick={handleFile}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PhotoLibrary style={{ color: "green" }} />
                <input
                  ref={fileRef}
                  type="file"
                  name="image"
                  value={fileInput}
                  onChange={handleFileInputChange}
                  className="form-input postCreate-image-input"
                />
                Photo/Gifs
              </div>
            </IconButton>
            {fileName ? fileName : <></>}
          </div>
          <button type="submit"></button>
        </Paper>
      </form>
    </>
  );
};

export default CreatePost;
