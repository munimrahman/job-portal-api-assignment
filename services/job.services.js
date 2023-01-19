const JobPost = require("../models/JobPost");

exports.postJobService = async (data) => {
  const result = await JobPost.create(data);
  return result;
};

exports.getAllJobService = async () => {
  const jobs = await JobPost.find({});
  const jobsCount = await JobPost.countDocuments({});
  return { jobs, jobsCount };
};

exports.getJobByIdService = async (jobId) => {
  const job = await JobPost.findById(jobId);
  return job;
};

exports.updateJobService = async (jobId, updatedInfo) => {
  const updatedJob = await JobPost.updateOne({ _id: jobId }, updatedInfo, {
    runValidators: true,
  });
  return updatedJob;
};

exports.applyJobService = async (jobId, applyData) => {
  return "Apply Job Services";
};

exports.getTop10AppliedJobService = async () => {
  return "Get Top 10 Job Services";
};

exports.getTop5PaidJobService = async () => {
  return "Get All Job Services";
};
