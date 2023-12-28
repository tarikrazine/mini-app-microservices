import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  console.log("Received Event", req.body.type);

  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);

  res.status(200).send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Event-bus api listening on port 4005");
});
