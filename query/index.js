import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  res.status(201).send({ status: "OK" });
});

app.listen(4002, () => {
  console.log("Comments api listening on 4002");
});
