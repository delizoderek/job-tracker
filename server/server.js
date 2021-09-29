const express = require("express");
const {authMiddleware} = require('./utils/auth');
const cors = require("cors");
const path = require('path');
const allRoutes = require('./controller');
const db = require("./config/connection.js");
const PORT = process.env.PORT || 3005;

const app = express();

app.use(cors());
app.use(authMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(allRoutes);

// routes
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once("open", (err,resp) => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
});
