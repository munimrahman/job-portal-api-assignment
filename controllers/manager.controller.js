const managerServices = require("../services/manager.service");
const jobServices = require("../services/job.services");

exports.getAllJobFromSingleManager = async (req, res, next) => {
  try {
    const result = await managerServices.getAllJobFromSingleManagerService(
      req.query.email
    );
    console.log("Managers Job Postings");
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

exports.getManagersJobByID = async (req, res, next) => {
  try {
    const job = await jobServices.getJobByIdService(req.params.id);
    console.log("Managers Job Postings By Id");
    res.status(200).send({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
