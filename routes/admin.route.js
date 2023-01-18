const express = require("express");
const adminController = require("../controllers/admin.controller");
const router = express.Router();

router.get("/candidates", adminController.getAllCandidates);
router.get("/hiring-managers", adminController.getAllHiringManagers);

router
  .route("/candidates/:id")
  .get(adminController.getCandidateById)
  .patch(adminController.updateUser);

router.get("/hiring-managers/:id", adminController.getHiringManagerById);

module.exports = router;
