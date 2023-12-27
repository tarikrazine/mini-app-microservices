import { randomBytes } from "crypto";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const commentsByPostId = {};

app.get("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;

  res.status(200).json(commentsByPostId[postId] || []);
});

app.post("/posts/:postId/comments", (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  const id = randomBytes(4).toString("hex");

  const comments = commentsByPostId[postId] || [];

  comments.push({ id, content });

  commentsByPostId[postId] = comments;

  res.status(201).json(commentsByPostId[postId]);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
