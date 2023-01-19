const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobApplicationSchema = new Schema({
  candidate: {
    name: String,
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "JobPost",
  },
  // coverLetter: {
  //   type: String,
  // },
  // resume: {
  //   type: String,
  // },
  // status: {
  //   type: String,
  //   enum: ["Applied", "Interview Scheduled", "Offered", "Hired", "Rejected"],
  //   default: "Applied",
  // },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

module.exports = JobApplication;
