const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/sign-up", userController.signUp);
router.get("/sign-up/confirmation/:token", userController.confirmEmail);

router.post("/log-in", userController.logIn);

router.get("/me", verifyToken, userController.getUserInfo);

module.exports = router;
