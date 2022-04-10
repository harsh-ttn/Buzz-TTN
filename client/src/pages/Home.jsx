import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import UserInfo from "../components/LeftSidebar/UserInfo";
import Posts from "../components/Post/Posts";
import Contacts from "../components/Contact/Contacts";
import Suggestions from "../components/Suggestion/Suggestions";
import Events from "../components/LeftSidebar/Events";
import axios from "axios";
import Header from "../components/Header";
import CreatePost from "../components/Post/CreatePost";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/context";

const Home = () => {
  const [users, setUsers] = useState([]);
  var user = JSON.parse(localStorage.getItem("user-data"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sortType, setSortType] = useState("");
  const { postCreated, setPostCreated } = useContext(DataContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (user == undefined) {
      navigate("/google");
      return;
    }

    const getUsers = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        console.log(res.data);
        setUsers(res.data);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getUsers();
    console.log("Home page", user);
  }, []);

  return (
    <>
      {!user ? (
        <></>
      ) : (
        <>
          <Header user={user} />
          <Container maxWidth="lg">
            <Grid container direction="row" spacing={4}>
              <Grid
                style={{ textAlign: "center", position: "sticky", top: 0 }}
                item
                xs={3}
              >
                {/* <p>Left Sidebar</p> */}
                <div
                  style={{ textAlign: "center", position: "sticky", top: 0 }}
                >
                  <UserInfo user={user} />
                  <Events />
                </div>
              </Grid>
              <Grid style={{ textAlign: "center" }} item xs={6}>
                {/* <p>Middle</p> */}
                <CreatePost />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin:
                      "5px 0" /* ,  height: "90vh", overflowX: "hidden", overflowY: "auto" */,
                  }}
                >
                  <FormControl style={{ width: "30%" }}>
                    <InputLabel id="demo-controlled-open-select-label">
                      Sort by
                    </InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={sortType}
                      onChange={(e) => {
                        setSortType(e.target.value);
                        setPostCreated((p) => !p);
                      }}
                    >
                      <MenuItem value="latest">Latest</MenuItem>
                      <MenuItem value="top">Top</MenuItem>
                      <MenuItem value="liked">Most Liked</MenuItem>
                      <MenuItem value="disliked">Most Disliked</MenuItem>
                    </Select>
                  </FormControl>

                  <Posts sortType={sortType} />
                </div>
              </Grid>
              <Grid style={{ textAlign: "center" }} item xs={3}>
                {/* <p>Right Sidebar</p> */}
                <div
                  style={{ textAlign: "center", position: "sticky", top: 0 }}
                >
                  <Contacts style={{ paddingBottom: 20 }} users={users} />
                  <Suggestions users={users} />
                </div>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
