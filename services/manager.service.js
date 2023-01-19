const JobPost = require("../models/JobPost");
const User = require("../models/User");

exports.getAllJobFromSingleManagerService = async (hiringManagerEmail) => {
  const jobs = await User.findOne({ email: hiringManagerEmail }).populate(
    "jobPostings"
  );
  const jobsCount = jobs.jobPostings.length;
  return { jobs, jobsCount };
};
