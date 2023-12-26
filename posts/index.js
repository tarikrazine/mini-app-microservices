import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const posts = [
  { id: 1, title: "First post", content: "This is the first post" },
  { id: 2, title: "Second post", content: "This is the second post" },
  { id: 3, title: "Third post", content: "This is the third post" },
];

app.get("/healthcheck", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).send("Missing title or content");
  }

  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };

  posts.push(newPost);

  res.json(posts);
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
