const express = require("express");
const cors = require("cors");

require("dotenv").config();

require("./database");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  process.env.MODE === "DEVELOPMENT"
    ? console.log(`http://localhost:${port}`)
    : "";
});
