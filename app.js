const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const jobRouter = require("./routes/job.route");
const adminRouter = require("./routes/admin.route");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From Job Portal Server");
});

// Routes
app.use("/", userRouter, jobRouter, adminRouter);

app.all("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

module.exports = app;
