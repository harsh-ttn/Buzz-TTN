import React, { useState, useEffect } from "react";
import Profile from "./profile";
import cover from "./cover.jpg";
import {
  Avatar,
  Button,
  CardContent,
  Card,
  Grid,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PersonAdd, PresentToAll } from "@material-ui/icons";
import Header from "../../Header";
import axios from "../../../service/axios";
import { useParams } from "react-router-dom";
import Suggestions from "../../Suggestion/Suggestions";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Userprofile() {
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  let { id } = useParams();

  useEffect(() => {
    const getuserData = async () => {
      try {
        const res = await axios(`/api/user/${id}`);
        console.log(res.data);
        if (res.data.designation === undefined) {
          res.data.designation = "Someone";
          res.data.city = "Some";
          res.data.state = "Where";
          res.data.userImage =
            "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80";
        }
        setUserData(res.data);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getuserData();
  }, [id]);

  return (
    <>
      <Header />
      <Grid
        container
        style={{
          padding: "0 25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid xs={9} item>
          <Card style={{ maxWidth: "60vw" }}>
            <CardMedia style={{ position: "relative" }}>
              <img src={cover} alt="user-cover" width="100%" />
              <Avatar
                style={{
                  height: "10vw",
                  width: "10vw",
                  position: "absolute",
                  top: "80%",
                  left: "50%",
                  transform: "translate(-50%, -30%)",
                  border: "3px solid white",
                }}
                src={userData.userImage}
              />
            </CardMedia>
            <CardContent>
              <form>
                <div
                  style={{
                    backgroundColor: "#E5E4E2",
                  }}
                >
                  <Profile
                    name={userData.name}
                    about={`${userData.name} is ${userData.designation} `}
                    location={`${userData.city}, ${userData.state}`}
                  />

                  <div style={{ paddingLeft: "60px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<PersonAdd />}
                    >
                      Add Friend
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.margin}
                      startIcon={<PresentToAll />}
                    >
                      Website
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={3} item>
          <Suggestions />
        </Grid>
      </Grid>
    </>
  );
}
