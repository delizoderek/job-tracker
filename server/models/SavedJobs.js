const { Schema, model } = require("mongoose");

const savedJobsSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  appLink: {
    type: String,
    required: true,
  },
});

const SavedJobs = model("savedjobs", savedJobsSchema);

module.exports = SavedJobs;
