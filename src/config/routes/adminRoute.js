const express = require("express");
const { authController, userController } = require("../../app/controllers");
const authorize = require("../../middlewares/authorize");
const roleCheck = require("../../middlewares/roleCheck");
const router = express.Router();

// Admin
router.get("/admin/auth", authorize, roleCheck(["superadmin"]), authController.getAllUserAuth);
router.post(
  "/admin/auth/register",
  authorize,
  roleCheck(["superadmin"]),
  authController.userRegister
);
router.delete("/admin/auth/:id", authorize, roleCheck(["superadmin"]), userController.deleteUser);

module.exports = router;
