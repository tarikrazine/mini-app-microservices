import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", async (req, res) => {
  const event = req.body;

  if (event.type === "PostCreated") {
    const { id, title, content } = event.data;

    posts[id] = { id, title, content, comments: [] };
  }

  if (event.type === "CommentCreated") {
    const { id, content, postId } = event.data;

    const post = posts[postId];

    post.comments.push({ id, content });
  }

  console.log(posts);

  res.status(200);
});

app.listen(4002, () => {
  console.log("Query api listening on 4002");
});
