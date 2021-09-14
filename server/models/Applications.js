const { Schema, model } = require("mongoose");

const applicationSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  appId: {
    type: Number,
    required: false,
  },
  appLink: {
    type: String,
  },
  processState: {
    type: String,
    required: true,
  },
  dateSubmitted:{
    type: Date, 
  }
});

const Applications = model("applications", applicationSchema);

module.exports = Applications;
