const express = require("express");
const { authController } = require("../../app/controllers");
const authorize = require("../../middlewares/authorize");
const roleCheck = require("../../middlewares/roleCheck");
const router = express.Router();

// Role check
router.get("/whoami", authorize, roleCheck(["member", "admin"]), (req, res) => {
  res.status(200).json(req.user);
});

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.userRegister);
router.get("/auth", authController.getAllUserAuth);
router.get("/auth/refresh-token", authController.generateAccessToken);

module.exports = router;
