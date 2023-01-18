const jobServices = require("../services/job.services");

exports.getAllJobs = async (req, res, next) => {
  try {
    const result = await jobServices.getAllJobService();
    console.log("Get All Job Route Working");
    res.status(200).send({
      success: true,
      data: {
        count: result.jobsCount,
        jobs: result.jobs,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.postJobs = async (req, res, next) => {
  try {
    const result = await jobServices.postJobService(req.body);
    console.log("Post Job Route Working");
    res.status(200).send({
      success: true,
      message: "Job Posted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const result = await jobServices.getJobByIdService(req.params.id);
    console.log("Get Job By Id Route Working");
    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const result = await jobServices.updateJobService();
    console.log("Update Job Route Working");
    res.status(200).send({
      success: true,
      message: "Job Updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.applyJob = async (req, res, next) => {
  try {
    const result = await jobServices.applyJobService();
    console.log("Apply Job Route Working");
    res.status(200).send({
      success: true,
      message: "Job Applied Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getTop10AppliedJob = async (req, res, next) => {
  try {
    const result = await jobServices.getTop10AppliedJobService();
    console.log(" Get Top !0 Job Route Working");
    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getTop5PaidJob = async (req, res, next) => {
  try {
    const result = await jobServices.getTop5PaidJobService();
    console.log("Get Top 5 Paid Route Working");

    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
