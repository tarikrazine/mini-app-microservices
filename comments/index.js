import { randomBytes } from "crypto";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

const commentsByPostId = {};

app.get("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;

  res.status(200).json(commentsByPostId[postId] || []);
});

app.post("/posts/:postId/comments", async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  const id = randomBytes(4).toString("hex");

  const comments = commentsByPostId[postId] || [];

  comments.push({ id, content, status: "pending" });

  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id,
      content,
      postId,
      status: "pending",
    },
  });

  res.status(201).json(commentsByPostId[postId]);
});

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);

    comment.status = status;

    await axios
      .post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          id: id,
          postId,
          status: status,
          content: content,
        },
      })
      .catch((error) => console.log(error));
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Comments api listening on 4001");
});
