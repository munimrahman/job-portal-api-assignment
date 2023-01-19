const JobApplication = require("../models/JobApplication");
const JobPost = require("../models/JobPost");
const User = require("../models/User");

exports.postJobService = async (data) => {
  const result = await JobPost.create(data);
  const hiringMangerId = result.hiringManager.id;
  const hiringManager = await User.findById(hiringMangerId);
  hiringManager.jobPostings.push(result.id);
  const updatedHiringManagerJobPosting = await hiringManager.save();
  console.log(updatedHiringManagerJobPosting);
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
  const result = await JobApplication.create(applyData);
  console.log(jobId);
  const updateCandidate = await User.findById(result.candidate.id);
  updateCandidate.appliedJobs.push(result.id);
  updateCandidate.save();

  const updateJob = await JobPost.findById(jobId);
  updateJob.applicants.push(result.id);
  updateJob.save();

  return result;
};

exports.getTop10AppliedJobService = async () => {
  return "Get Top 10 Job Services";
};

exports.getTop5PaidJobService = async () => {
  return "Get All Job Services";
};
