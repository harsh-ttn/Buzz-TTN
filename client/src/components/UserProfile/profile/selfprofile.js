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
  Container,
} from "@material-ui/core";
import Header from "../../Header";
import Suggestions from "../../Suggestion/Suggestions";

const Selfprofile = () => {
  var user = JSON.parse(localStorage.getItem("user-data"));

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs={12} sm={6} lg={8} md={7} item>
            <Card>
              <CardContent>
                <Profile name={user.name} />

                <Formdetails />
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={3} sm={4} item>
            <Suggestions />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Selfprofile;
