import express from "express";
import postRouter from "./routes/postRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import commentRouter from "./routes/commentRouter.js";
import friendRouter from "./routes/friendRouter.js";
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./config/dbConfig.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api", postRouter);
app.use("/api", userRouter);
app.use("/api", commentRouter);
app.use("/api", friendRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Server Online");
});

app.listen(port, () => console.log(`Running on: http://localhost:${port}`));

dbConnect();
