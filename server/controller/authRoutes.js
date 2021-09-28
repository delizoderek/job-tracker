const authRouter = require('express').Router();
const {signToken} = require('../utils/auth')
const {User,Applications, SavedJobs} = require('../models');

// Login
authRouter.post("/login", async (req, res) => {
  try {
    console.log(req);
    res.json(req.body);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Logout
authRouter.post("/logout", (req, res) => {
  console.log(req);
});

// Sign-Up
authRouter.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    if(userData){
      const token = signToken(userData);
      res.status(200).json({token,userData});
    } else {
      res.status(404).json({message: false, description:"Invalid data in the input fields"});
    }
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});


module.exports = authRouter;