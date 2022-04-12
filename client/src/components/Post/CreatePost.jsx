import React, { useState, useRef, useContext } from "react";
import { Paper, Avatar, IconButton, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { PhotoLibrary } from "@material-ui/icons";
import axios from "../../service/axios";
import { DataContext } from "../../context/context";

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
      await axios.post("/api/posts", formData);
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
      setTimeout(() => {
        setPostCreated((p) => !p);
      }, 1000);
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
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, ["image"]: reader.result }));
    };
  };
  //

  const handleFile = () => {
    fileRef.current.click();
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

      <form onSubmit={onFormSubmit}>
        <Paper
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
            <input
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
                color: "black",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
                  className="form-input"
                  style={{ display: "none" }}
                />
                Photo/Video
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
