const app = require("./app");
const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Database Connected Successfully".green.bold);
});

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.yellow.bold);
});
