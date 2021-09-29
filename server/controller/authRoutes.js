const authRouter = require('express').Router();
const {signToken} = require('../utils/auth')
const {User,Applications, SavedJobs} = require('../models');

// Login
authRouter.post("/login", async (req, res) => {
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email});

    if(!user){
      res.status(404).json({message:"Could not find user"});
      return;
    }
    const checkPass = user.isCorrectPassword(password);
    if(!checkPass){
      res.status(404).json({message:"Could not find user"});
      return;
    }

    const token = signToken(user);
    res.status(200).json({token,user});
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
authRouter.post("/sign-up", async (req, res) => {
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