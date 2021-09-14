const { Schema, model } = require("mongoose");

const jobTrackerSchema = new Schema({
  watchlist: [
    {
      appLink: {
        type: String,
        required: true,
      },
      dateAdded:{
        type: Date,
      }
    },
  ],
  jobsApplied: [
    {
      appId:{
        type: Number,
        required: false,
      },
      appLink:{
        type:String,
      },
      processState:{
        type:String,
        required: true,
      }
    },
  ],
});

const JobList = model("joblist", jobTrackerSchema);

module.exports = JobList;
