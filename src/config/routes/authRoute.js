const express = require("express");
const { authController } = require("../../app/controllers");
const authorize = require("../../middlewares/authorize");
const roleCheck = require("../../middlewares/roleCheck");
const router = express.Router();

// Role check
router.get("/api/v1/whoami", authorize, roleCheck(["member", "admin"]), (req, res) => {
  res.status(200).json(req.user);
});

router.post("/api/v1/auth/login", authController.login);
router.post("/api/v1/auth/register", authController.userRegister);
router.get("/api/v1/auth", authController.getAllUserAuth);
router.get("/api/v1/auth/refresh-token", authController.generateAccessToken);

module.exports = router;
