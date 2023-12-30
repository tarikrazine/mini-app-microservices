import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

function handelEvents(type, data) {
  if (type === "PostCreated") {
    const { id, title, content } = data;

    posts[id] = { id, title, content, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, postId, status, content } = data;

    const post = posts[postId];

    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
}

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", async (req, res) => {
  const event = req.body;

  handelEvents(event.type, event.data);

  res.status(200);
});

app.listen(4002, async () => {
  console.log("Query api listening on 4002");

  const response = await axios
    .get("http://localhost:4005/events")
    .catch((error) => console.log(error));

  for (let event of response.data) {
    console.log("Processing event: ", event.type);
    handelEvents(event.type, event.data);
  }
});
