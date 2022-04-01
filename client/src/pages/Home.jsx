import React from "react";
import { Container, Grid } from "@material-ui/core";
import UserInfo from "../components/UserInfo";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Grid container direction="row" spacing={4}>
        <Grid
          style={{  textAlign: "center" }}
          item
          xs={3}
        >
          {/* <p>Left Sidebar</p> */}
          <UserInfo />
        </Grid>
        <Grid
          style={{  textAlign: "center" }}
          item
          xs={6}
        >
          {/* <p>Middle</p> */}
          <CreatePost />
          <div style={{ padding: "30px 0" }}>
            <Post />
            <Post />
            <Post />
          </div>
        </Grid>
        <Grid
          style={{ textAlign: "center" }}
          item
          xs={3}
        >
          {/* <p>Right Sidebar</p> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
