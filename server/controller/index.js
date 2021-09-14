const router = require('express').Router();
const {Applications, SavedJobs} = require('../models');

router.get('/jobs', async (req,res) => {
  try{
    const allApps = await Applications.find({});
    const allSaved = await Applications.find({});
    if(allApps && allSaved){
      res.status(200).json({allApps,allSaved});
    } else if(allApps){
      res.status(200).json({allApps});
    } else if(allSaved){
      res.status(200).json({allSaved});
    } else {
      res.status(404).json({message:"Could not find that data"});
    }
  } catch (err){
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
