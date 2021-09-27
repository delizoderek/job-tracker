const router = require('express').Router();
const {Applications, SavedJobs} = require('../models');

router.get('/jobs', async (req,res) => {
  try{
    const allApps = await Applications.find({});
    const allSaved = await SavedJobs.find({});
    if(allApps && allSaved){
      res.status(200).json({allApps,allSaved});
    } else if(allApps){
      res.status(200).json({allApps,allSaved:[]});
    } else if(allSaved){
      res.status(200).json({allApps:[],allSaved});
    } else {
      res.status(404).json({allApps:[],allSaved:[],message:"Could not find that data"});
    }
  } catch (err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/save-job', async (req,res) => {
  if(req.body){
    req.body.dateAdded = Date.now();
    try {
      const newSave = await SavedJobs.create(req.body);
      if(newSave){
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
  if(req.body){
    req.body.dateSubmitted = Date.now();
    try {
      const newApp = await Applications.create(req.body);
      if(newApp){
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


module.exports = router;
