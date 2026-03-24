const express = require("express");
const app = express();

app.use(express.json());

let reservations = [];
let users = [];
let resources = [];

app.post("/reservations", (req, res) => {
  const { user, time } = req.body;

  if (!users.includes(user)) {
    users.push(user);
  }

  if (!resources.includes(time)) {
    resources.push(time);
  }

  if (!user || !time) {
    return res.status(400).send("Invalid data");
  }

  if (reservations.find(r => r.time === time)) {
  return res.status(400).send("Time already reserved");
  }

  if (reservations.find(r => r.user === user)) {
    return res.status(400).send("User already has reservation");
  }

  if (time < "09:00") {
    return res.status(400).send("Too early");
  }

  reservations.push({ user, time });

  res.status(201).json({ user, time });
});

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

module.exports = app;