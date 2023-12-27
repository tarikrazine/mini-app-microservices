import { randomBytes } from "crypto";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000",
}));

const posts = {};

app.get("/healthcheck", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/posts", (req, res) => {
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

  res.status(201).json(posts[id])
});

app.listen(4000, () => {
  console.log("Listening on port 4000!");
});
