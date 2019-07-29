import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import postsRoute from "./routes/posts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", postsRoute);

app.get("/", (req, res) => {
  res.send("You're on the homepage.");
});

mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true }, () =>
  console.log("Connected to database!")
);

app.listen(3000);
