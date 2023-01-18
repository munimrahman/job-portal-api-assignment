const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");

router
  .route("/jobs")
  .get(jobController.getAllJobs)
  .post(jobController.postJobs);

router
  .route("/jobs/:id")
  .get(jobController.getJobById)
  .post(jobController.applyJob)
  .patch(jobController.updateJob);
module.exports = router;
