import express from "express";
import postRouter from "./routes/postRouter.js";
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./config/dbConfig.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", postRouter);

app.get("/", (req, res) => {
  res.send("Server Online");
});

app.listen(port, () => console.log(`Running on: http://localhost:${port}`));

dbConnect();
