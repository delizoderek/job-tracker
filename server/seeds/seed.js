const {Applications, SavedJobs} = require('../models');
const appSeeds = require('./apps.json');
const savedSeeds = require('./saved.json');
const db = require("../config/connection");

// Open database and seed the data
db.once("open", async () => {
  console.log("------------Loading in Submitted Applications------------");
  await Applications.deleteMany({});
  appSeeds.map((item) => {
    item.dateSubmitted = Date.now();
  });
  try {
      await Applications.create(appSeeds);
  } catch (e) {
    console,log(error);
  }

  console.log("------------Loading in saved jobs------------");
  await SavedJobs.deleteMany({});
  appSeeds.map((item) => {
    item.dateAdded = Date.now();
  });
  try {
      await SavedJobs.create(savedSeeds);
  } catch (e) {
    console,log(error);
  }

  console.log("all done!");
  process.exit(0);
});
