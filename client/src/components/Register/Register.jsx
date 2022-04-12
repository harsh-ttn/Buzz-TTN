import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { RegisterApiCall } from "../ApiCall/RegisterApiCall";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import logo from "./logoPng.png";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [emailval, setEmailval] = useState("");
  const [pwdval, setPwdval] = useState("");
  const [confirmpwdval, setConfirmPwdval] = useState("");
  const navigate = useNavigate();
  //snackabar
  const [statusBar, setStatusBar] = useState({
    status: "success",
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "Creating Post ... ",
  });
  const { vertical, horizontal, open, status, message } = statusBar;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name !== "" ||
      emailval !== "" ||
      pwdval !== "" ||
      confirmpwdval !== ""
    ) {
      if (/@tothenew.com\s*$/.test(emailval)) {
        if (pwdval === confirmpwdval) {
          RegisterApiCall({
            name: name,
            email: emailval,
            password: pwdval,
            google: false,
            userImage: "",
          });
          setName("");
          setEmailval("");
          setPwdval("");
          setConfirmPwdval("");
          setStatusBar({
            status: "success",
            open: true,
            vertical: "top",
            horizontal: "center",
            message: "User signed-up successfully.Kindly Login!!",
          });
          setTimeout(() => {
            navigate("/google");
          }, 2000);
        } else {
          setStatusBar({
            status: "error",
            open: true,
            vertical: "top",
            horizontal: "center",
            message: "Passwords don't match. Kindly try again",
          });
        }
      } else {
        setStatusBar({
          status: "error",
          open: true,
          vertical: "top",
          horizontal: "center",
          message:
            "User can only sign-up using To The New official email-ID. Kindly try again!!",
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
          autoHideDuration={3000}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      )}
      <div className="register-main">
        <div className="img-class">
          <img src={logo} id="img-id" alt="" />
        </div>
        <div className="top">
          <h5>
            Already have an account?
            <Link id="link-signin" to="/google">
              {" "}
              Sign in
            </Link>
          </h5>
        </div>

        <div className="form">
          <div className="body">
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Enter your Name :</label>
              <input
                placeholder="Enter your name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="email1">Email :</label>

              <input
                placeholder="TTN Email-ID"
                type="email"
                value={emailval}
                onChange={(e) => {
                  setEmailval(e.target.value);
                }}
              />

              <label htmlFor="pwd1">Password :</label>
              <input
                placeholder="Password"
                type="password"
                value={pwdval}
                onChange={(e) => {
                  setPwdval(e.target.value);
                }}
              />
              <label htmlFor="confirmpwd1">Confirm Password :</label>
              <input
                placeholder="Confirm password"
                type="password"
                value={confirmpwdval}
                onChange={(e) => {
                  setConfirmPwdval(e.target.value);
                }}
              />
              <button type="submit" id="sub-btn">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
