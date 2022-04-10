import React, { useState, useRef, useContext } from "react";
import { Paper, Avatar, IconButton } from "@material-ui/core";
import { PhotoLibrary } from "@material-ui/icons";
import axios from "axios";
import { DataContext } from "../../context/context";

const initialState = {
  content: "",
  image: "",
  author: "Harsh",
  authorImage: "",
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

  const fileRef = useRef();

  const onChange = (e) => {
    if (user)
      setFormData((prev) => ({
        ...prev,
        ["author"]: user.name,
        ["authorImage"]: user.userImage,
      }));
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (user) setFormData((prev) => ({ ...prev, ["author"]: user.name }));
    try {
      /* await axios.post("http://localhost:8080/api/posts", formData); */
      await axios.post(
        "https://buzz-app-ttn.herokuapp.com/api/posts",
        formData
      );
      console.log("Post Created", formData);
      setPostCreated((p) => !p);
      setFileInput("");
      setFileName("");
      setFormData(initialState);
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };
  //cloudinray
  const handleFileInputChange = (e) => {
    if (e.target.files[0].size > 10000000) {
      setFileName("File Size greater than 10mb");
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

  return (
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
        <Avatar />
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
  );
};

export default CreatePost;
