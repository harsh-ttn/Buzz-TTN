import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import UserInfo from "../components/LeftSidebar/UserInfo";
import Posts from "../components/Post/Posts";
import Contacts from "../components/Contact/Contacts";
import Suggestions from "../components/Suggestion/Suggestions";
import Events from "../components/LeftSidebar/Events";
import axios from "axios";
import Header from "../components/Header";
import CreatePost from "../components/Post/CreatePost";

const Home = () => {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user-data"));

  useEffect(() => {
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
      <Header user={user} />
      <Container maxWidth="lg">
        <Grid container direction="row" spacing={4}>
          <Grid
            style={{ textAlign: "center", position: "sticky", top: 0 }}
            item
            xs={3}
          >
            {/* <p>Left Sidebar</p> */}
            <div style={{ textAlign: "center", position: "sticky", top: 0 }}>
              <UserInfo user={user} />
              <Events />
            </div>
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
            <div style={{ textAlign: "center", position: "sticky", top: 0 }}>
              <Contacts style={{ paddingBottom: 20 }} users={users} />
              <Suggestions users={users} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
