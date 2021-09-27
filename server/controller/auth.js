const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User,Applications, SavedJobs} = require('../models');

// Login
router.post("/login", async (req, res) => {
  try {
    console.log(req);
    res.json(req.body);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  console.log(req);
});

// Sign-Up
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    if(userData){
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;

        res.status(200).json({message: true,});
      });
    } else {
      res.status(404).json({message: false, description:"Invalid data in the input fields"});
    }
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});


module.exports = router;