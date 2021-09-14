const {JobList} = require('../models');
const jobSeeds = require('./seed.json');
const db = require("../config/connection");

db.once("open", async () => {
  await JobList.deleteMany({});
  try {
      await JobList.create(jobSeeds);
  } catch (e) {
    console,log(error);
  }
  console.log("------------Video Id's now connected to Skaters------------");
  console.log("all done!");
  process.exit(0);
});
