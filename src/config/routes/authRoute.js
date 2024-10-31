const express = require("express");
const { authController } = require("../../app/controllers");
const authorize = require("../../middlewares/authorize");
const roleCheck = require("../../middlewares/roleCheck");
const router = express.Router();

// Current User Check
router.get("/auth/user", authorize, authController.getCurrentUser);

router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.post("/auth/register", authController.userRegister);
router.get("/auth/refresh-token", authController.generateAccessToken);

// Admin
router.get("/admin/auth", authorize, roleCheck(["superadmin"]), authController.getAllUserAuth);
router.post(
  "/admin/auth/register",
  authorize,
  roleCheck(["superadmin"]),
  authController.userRegister
);

module.exports = router;
