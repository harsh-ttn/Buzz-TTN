import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "./logoPng.png";
import signin from "./signin.png";
import axios from "../../service/axios";
import { useNavigate } from "react-router-dom";
import GLogin from "../GLogin";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

function Login() {
  const navigate = useNavigate();

  const [emailval, setEmailval] = useState("");
  const [pwdval, setPwdval] = useState("");
  //snackabar
  const [statusBar, setStatusBar] = useState({
    status: "success",
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "Creating Post ... ",
  });
  const { vertical, horizontal, open, status, message } = statusBar;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailval !== "" || pwdval !== "") {
      if (/@tothenew.com\s*$/.test(emailval)) {
        console.log("Dikhja");
        try {
          const user = await axios.post("/auth/login", {
            email: emailval,
            password: pwdval,
          });
          setEmailval("");
          setPwdval("");
          localStorage.setItem("token", JSON.stringify(user.data.token));
          localStorage.setItem("user-data", JSON.stringify(user.data.user));
          navigate("/");
        } catch (error) {
          setStatusBar({
            status: "error",
            open: true,
            vertical: "top",
            horizontal: "center",
            message: error.response.data.errorMessage,
          });
        }
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
    }
  };

  //snackbar close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatusBar(false);
  };

  return (
    <>
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
      <div className="main-login">
        <div className="login-container">
          <div className="left-side">
            <div className="img-class">
              <img src={logo} id="img-id" alt="" />
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email1">Email :</label>

              <input
                placeholder="TTN Email-ID"
                type="email"
                value={emailval}
                onChange={(e) => {
                  setEmailval(e.target.value);
                }}
                id="email1"
              />

              <label htmlFor="pwd1">Password :</label>
              <input
                placeholder="Password"
                type="password"
                value={pwdval}
                onChange={(e) => {
                  setPwdval(e.target.value);
                }}
                id="pwd1"
              />

              <button type="submit" id="sub-btn">
                Sign in
              </button>
            </form>

            <div className="footer">
              <h4>
                Don't have an account?{" "}
                <Link className="link" to="/register">
                  Sign Up Now
                </Link>
              </h4>
            </div>
          </div>
          <div className="right-side">
            <div className="welcomenote">
              <h3>Enter your details and Start your journey with us</h3>
              <h4 className="note">Don't stop until you are PROUD</h4>
            </div>
            <div className="signinImg">
              <img src={signin} id="signin_img" alt="" />
            </div>
            <div className="signin_google">
              <GLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
