import React from "react";
import { Container, Grid } from "@material-ui/core";
import UserInfo from "../components/UserInfo";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import Posts from "../components/Posts";
import Contacts from "../components/Contacts";
import Suggestions from "../components/Suggestions";
import Events from "../components/Events";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Grid container direction="row" spacing={4}>
        <Grid style={{ textAlign: "center" }} item xs={3}>
          {/* <p>Left Sidebar</p> */}
          <UserInfo />
          <Events />
        </Grid>
        <Grid style={{ textAlign: "center" }} item xs={6}>
          {/* <p>Middle</p> */}
          <CreatePost />
          <div
            style={{
              margin:
                "30px 0" /* ,  height: "90vh", overflowX: "hidden", overflowY: "auto" */,
            }}
          >
            <Posts />
          </div>
        </Grid>
        <Grid style={{ textAlign: "center" }} item xs={3}>
          {/* <p>Right Sidebar</p> */}
          <Contacts style={{ paddingBottom: 20 }} />
          <Suggestions />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
