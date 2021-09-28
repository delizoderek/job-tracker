const {User, Applications, SavedJobs} = require('../models');
const db = require("../config/connection");

// Open database and seed the data
db.once("open", async () => {
  console.log("------------Deleting Submitted Applications------------");
  await Applications.deleteMany({});
  console.log("------------Deleting saved jobs------------");
  await SavedJobs.deleteMany({});
  console.log("------------Deleting saved jobs------------");
  await User.deleteMany({});

  console.log("all done!");
  process.exit(0);
});
