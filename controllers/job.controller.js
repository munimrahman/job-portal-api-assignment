const jobServices = require("../services/job.services");

exports.getAllJobs = async (req, res, next) => {
  const result = await jobServices.getAllJobService();
  console.log("Get All Job Route Working");
  res.send(result);
};

exports.postJobs = async (req, res, next) => {
  const result = await jobServices.postJobService();
  console.log("Post Job Route Working");
  res.send(result);
};

exports.getJobById = async (req, res, next) => {
  const result = await jobServices.getJobByIdService();
  console.log("Get Job By Id Route Working");
  res.send(result);
};

exports.updateJob = async (req, res, next) => {
  const result = await jobServices.updateJobService();
  console.log("Update Job Route Working");
  res.send(result);
};

exports.applyJob = async (req, res, next) => {
  const result = await jobServices.applyJobService();
  console.log("Apply Job Route Working");
  res.send(result);
};

exports.getTop10AppliedJob = async (req, res, next) => {
  const result = await jobServices.getTop10AppliedJobService();
  console.log(" Get Top !0 Job Route Working");
  res.send(result);
};

exports.getTop5PaidJob = async (req, res, next) => {
  const result = await jobServices.getTop5PaidJobService();
  console.log("Get Top 5 Paid Route Working");
  res.send(result);
};
