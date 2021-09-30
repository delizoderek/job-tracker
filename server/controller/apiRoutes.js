const router = require('express').Router();
const {User, Applications, SavedJobs} = require('../models');

router.get('/jobs', async (req,res) => {
    if(!req.user){
      res.status(401).send('User needs to login');
      return;
    }

    try{
      const getUser = await User.findById(req.user._id).populate('savedJobs').populate('jobsApplied');
      if(!getUser){
        res.status(404).json({allApps:[],allSaved:[],message:"Could not find that data"});
      } else {
        res.status(200).json({allApps: [...getUser.jobsApplied],allSaved: [...getUser.savedJobs]});
      }
    } catch (err){
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post('/save-job', async (req,res) => {
    console.log(req.user);
    console.log(req.body);
    if(!req.user){
      res.status(401).send('User needs to login');
      return;
    }

    if(req.body){
      try {
        const newSave = await SavedJobs.create(req.body);
        const updateUser = await User.findByIdAndUpdate(req.user._id,{$addToSet: {savedJobs: newSave._id}});
        if(newSave && updateUser){
          res.status(200).json({status:true, ...newSave});
        } else {
          res.status(404).json({status:false, message: 'Job not added'});
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({status:false, message: 'Error on the server'});
      }
  
    } else {
      res.status(404).json({status: false, message: 'No body provided'});
    }
  });
  
  router.post('/save-app', async (req,res) => {
    console.log(req.user);
    console.log(req.body);
    if(!req.user){
      res.status(401).send('User needs to login');
      return;
    }

    if(req.body){
      req.body.dateSubmitted = Date.now();
      try {
        const newApp = await Applications.create(req.body);
        const updateUser = await User.findByIdAndUpdate(req.user._id,{$addToSet: {jobsApplied: newApp._id}});
        if(newApp && updateUser){
          res.status(200).json({status:true, ...newApp});
        } else {
          res.status(404).json({status:false, message: 'Application not added'});
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({status:false, message: 'Error on the server'});
      }
  
    } else {
      res.status(404).json({status: false, message: 'No body provided'});
    }
  });
  
  router.get('/user', async (req,res) => {
    const userData = await User.findOne();
  });

module.exports = router;