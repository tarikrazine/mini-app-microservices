import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  // axios.post("http://localhost:4000/events", event);
  // axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  res.status(200).send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Event-bus api listening on port 4005");
});
