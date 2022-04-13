import React, { useState, useContext, useEffect } from "react";
import "../config/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "../service/axios";
import "./Login/Login.css";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

const GLogin = () => {
  const navigate = useNavigate();
  const [statusBar, setStatusBar] = useState({
    status: "success",
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "Creating Post ... ",
  });
  const { vertical, horizontal, open, status, message } = statusBar;
  //snackbar close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatusBar(false);
  };

  const loginWithGoogle = async () => {
    try {
      console.log("Hello");
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      if (/@tothenew.com\s*$/.test(user.email)) {
        const userData = {
          name: user.displayName,
          email: user.email,
          userImage: user.photoURL,
          google: true,
          moderator: false,
          password: "*#*#)@*!%@",
        };

        const userDetails = await axios.post("/api/users", userData);
        console.log(userDetails);

        localStorage.setItem("token", JSON.stringify(userDetails.data.token));
        localStorage.setItem(
          "user-data",
          JSON.stringify(userDetails.data.user)
        );

        navigate("/");
      } else {
        setStatusBar({
          status: "error",
          open: true,
          vertical: "top",
          horizontal: "center",
          message:
            "You can only login with To The New email-ID. Kindly try again",
        });
      }
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  return (
    <div>
      {/* snackbar */}
      {status === "success" ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      )}
      <button className="google_btn" onClick={loginWithGoogle}>
        Login With Google
      </button>
    </div>
  );
};

export default GLogin;
