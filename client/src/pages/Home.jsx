import React from "react";
import { Container, Grid } from "@material-ui/core";
import UserInfo from "../components/UserInfo";
import CreatePost from "../components/CreatePost";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Grid container direction="row" spacing={4}>
        <Grid
          style={{ backgroundColor: "red", textAlign: "center" }}
          item
          xs={3}
        >
          <p>Left Sidebar</p>
          <UserInfo />
        </Grid>
        <Grid
          style={{ backgroundColor: "green", textAlign: "center" }}
          item
          xs={6}
        >
          <p>Middle</p>
          <CreatePost />
        </Grid>
        <Grid
          style={{ backgroundColor: "blue", textAlign: "center" }}
          item
          xs={3}
        >
          <p>Right Sidebar</p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
