const express = require("express");
const adminController = require("../controllers/admin.controller");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/candidates", adminController.getAllCandidates);
router.get("/hiring-managers", adminController.getAllHiringManagers);

router
  .route("/candidates/:id")
  .get(adminController.getCandidateById)
  .patch(verifyToken, authorization("admin"), adminController.updateUser);

router.get("/hiring-managers/:id", adminController.getHiringManagerById);

module.exports = router;
