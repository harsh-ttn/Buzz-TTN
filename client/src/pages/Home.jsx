import React from "react";
import { Grid } from "@material-ui/core";

const Home = () => {
  return (
    <>
      <Grid container direction="row" spacing={1}>
        <Grid
          style={{ backgroundColor: "red", textAlign: "center" }}
          item
          xs={3}
        >
          <p>Left Sidebar</p>
        </Grid>
        <Grid
          style={{ backgroundColor: "green", textAlign: "center" }}
          item
          xs={6}
        >
          <p>Middle</p>
        </Grid>
        <Grid
          style={{ backgroundColor: "blue", textAlign: "center" }}
          item
          xs={3}
        >
          <p>Right Sidebar</p>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
