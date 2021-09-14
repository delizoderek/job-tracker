const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/connection.js");
const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// routes
app.use(require("./routes/api.js"));
db.once("open", (err,resp) => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
});
