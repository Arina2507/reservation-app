const express = require("express");
const app = express();

app.use(express.json());

let reservations = [];

app.post("/reservations", (req, res) => {
  const { user, time } = req.body;

  if (!user || !time) {
    return res.status(400).send("Invalid data");
  }

  if (reservations.find(r => r.time === time)) {
  return res.status(400).send("Time already reserved");
  }

  reservations.push({ user, time });

  res.status(201).json({ user, time });
});

module.exports = app;