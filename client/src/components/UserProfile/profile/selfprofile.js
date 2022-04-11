import Profile from "./profile";
import Formdetails from "./formdetails";
import self from "./male.jpg";
import cover from "./cover.jpg";
import {
  Avatar,
  CardContent,
  Card,
  Grid,
  Button,
  IconButton,
} from "@material-ui/core";
import Header from "../../Header";


const Selfprofile = () => {
  var user = JSON.parse(localStorage.getItem("user-data"));

  return (
    <>
      <Header />
      <Card>
        <CardContent>

            <Grid container>
              <Grid
                xs={12}
                sm={6}
                lg={8}
                md={7}
                item
                style={{
                  padding: "0 25px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Profile name={user.name} />

                <Formdetails />
              </Grid>

              {/* <Grid xs={4} sm={4} item>
                                <Suggestions />
                            </Grid> */}
            </Grid>

        </CardContent>
      </Card>
    </>
  );
};

export default Selfprofile;
