import React from "react";
import Loader from "react-js-loader";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "./pages.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="error-container">
        <img
          src="https://media1.giphy.com/media/8L0Pky6C83SzkzU55a/200w.webp?cid=ecf05e470q9q6akt59e3wjkw7fepj4275yu8wtlo5frn4rve&rid=200w.webp&ct=g"
          alt="pic"
        />
        <h1>Page not found</h1>
        <Loader
          type="box-rectangular"
          bgColor={"#9c1f62"}
          color={"#FFFFFF"}
          size={50}
        />
        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          color="primary"
        >
          Back to Home
        </Button>
      </div>
    </>
  );
};

export default ErrorPage;
