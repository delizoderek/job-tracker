const express = require("express");
const {authMiddleware} = require('./utils/auth');
const cors = require("cors");
const allRoutes = require('./controller');
const db = require("./config/connection.js");
const PORT = process.env.PORT || 3005;

const app = express();
app.use(allRoutes);

app.use(cors());
app.use(authMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes

db.once("open", (err,resp) => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
});
