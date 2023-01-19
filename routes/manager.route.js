const express = require("express");
const router = express.Router();
const managerController = require("../controllers/manager.controller");

router.get(
  "/hiring-manager/jobs",
  managerController.getAllJobFromSingleManager
);

router.get("/hiring-manager/jobs/:id", managerController.getManagersJobByID);

module.exports = router;
