import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import UserInfo from "../components/LeftSidebar/UserInfo";
import Posts from "../components/Post/Posts";
import Contacts from "../components/Contact/Contacts";
import Suggestions from "../components/Suggestion/Suggestions";
import Events from "../components/LeftSidebar/Events";
import Header from "../components/Header";
import CreatePost from "../components/Post/CreatePost";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/context";
import Loader from "../components/Loader";

const Home = () => {
  var user = JSON.parse(localStorage.getItem("user-data"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sortType, setSortType] = useState("");
  const { postCreated, setPostCreated } = useContext(DataContext);
  const [state, setState] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const handleChange = () => {
    setState((p) => !p);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (user == undefined) {
      navigate("/google");
    }
    setShowLoader(false);
  }, []);

  return (
    <>
      {!user || showLoader ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Header />
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
                  <UserInfo />
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
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
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
                    {user.moderator ? (
                      <div>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={state}
                              onChange={handleChange}
                              color="primary"
                            />
                          }
                          label="Moderator"
                        />
                      </div>
                    ) : (
                      <> </>
                    )}
                  </div>

                  <Posts sortType={sortType} moderator={state} />
                </div>
              </Grid>
              <Grid style={{ textAlign: "center" }} item xs={3}>
                {/* <p>Right Sidebar</p> */}
                <div
                  style={{ textAlign: "center", position: "sticky", top: 0 }}
                >
                  <Contacts style={{ paddingBottom: 20 }} />
                  <Suggestions />
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
