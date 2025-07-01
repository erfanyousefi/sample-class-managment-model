const express = require("express");
const {sequelize, User, Course} = require("./models");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

sequelize.sync({force: true}).then(async () => {
  console.log("Database synced!");
  app.listen(3000, () => console.log("Server on port 3000"));
});
