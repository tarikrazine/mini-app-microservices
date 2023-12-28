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

const posts = {};

app.get("/healthcheck", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).send("Missing title or content");
  }

  const id = randomBytes(4).toString("hex");

  posts[id] = {
    id: id,
    title: title,
    content: content,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id: id,
      title: title,
      content: content,
    },
  });

  res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Posts api listening on port 4000!");
});
