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
router.post("/auth/logout", authController.logout);
router.post("/auth/register", authController.userRegister);
router.get("/auth/refresh-token", authController.generateAccessToken);

// Admin
router.get("/admin/auth", authorize, authController.getAllUserAuth);

module.exports = router;
