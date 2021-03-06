import React, { useState, useEffect, useContext } from "react";
import Profile from "./profile";
import cover from "./cover.jpg";
import {
  Avatar,
  Button,
  CardContent,
  Card,
  Grid,
  CardMedia,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PersonAdd, PresentToAll } from "@material-ui/icons";
import Header from "../../Header";
import axios from "../../../service/axios";
import { Link, useParams } from "react-router-dom";
import Suggestions from "../../Suggestion/Suggestions";
import { DataContext } from "../../../context/context";
import Loader from "../../Loader";
import { Alert } from "@material-ui/lab";

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
  var user = JSON.parse(localStorage.getItem("user-data"));
  const { friend, setFriend } = useContext(DataContext);
  const [showLoader, setShowLoader] = useState(false);
  const [friendCount, setFriendCount] = useState(1);
  const [isFriend, setIsFriend] = useState(false);
  const [statusBar, setStatusBar] = useState({
    status: "error",
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "your website is blank",
  });

  useEffect(() => {
    const getuserData = async () => {
      setShowLoader(true);
      try {
        const res = await axios(`/api/user/${id}`);
        if (res.data.designation === undefined) {
          res.data.designation = "Developer";
          res.data.city = "New Delhi";
          res.data.state = "Delhi";
        }

        const res1 = await axios.get(`/api/friendsCount/${id}`, {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
        });

        const res2 = await axios.get(`/api/isfriend/${id}?userId=${user._id}`, {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
        });
        setIsFriend(res2.data.data);
        setFriendCount(res1.data.data);
        setUserData(res.data);
        setShowLoader(false);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };

    getuserData();
  }, [id]);

  const Data = {
    userId: id,
    friendId: user._id,
    friendName: user.name,
    friendImage: user.userImage,
    status: "pending",
  };

  const sendFriendReq = async () => {
    try {
      const res = await axios.post(`/api/friends`, Data, {
        headers: {
          "x-auth-token": JSON.parse(localStorage.getItem("token")),
        },
      });
      setFriend((p) => !p);
      console.log(`Friend req ${Data} ${res}`);
    } catch (error) {
      console.log(`Error`, error);
    }
  };

  const goToWebsite = ()=>{
    if(`${userData.userWebsite}` === ""){
        alert("blank website");
      }
    
    else{
    window.open(`${userData.userWebsite}`, "_blank")
  }
}

  return (
    <>
    
      <Header />
      {showLoader ? (
        <Loader />
      ) : (
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid xs={9} item>
              <Card style={{ maxWidth: "60vw", backgroundColor: "#E5E4E2" }}>
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
                  <div
                    style={{
                      paddingTop: "8vh",
                    }}
                  >
                    <Profile
                      name={userData.name}
                      about={`${userData.name} is ${userData.designation} `}
                      location={`${userData.city}, ${userData.state}`}
                    />
                    <p>Friends : {friendCount}</p>

                    <div style={{ paddingLeft: "60px" }}>
                      {isFriend !== true ? (
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<PersonAdd />}
                          onClick={sendFriendReq}
                        >
                          Add Friend
                        </Button>
                      ) : (
                        <></>
                      )}
                      <Button 
                        variant="contained"
                        color="primary"
                        className={classes.margin}
                        startIcon={<PresentToAll />}
                        onClick={goToWebsite}
                      >
                        Website
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={3} item>
              <Suggestions />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
