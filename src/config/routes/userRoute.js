const express = require("express");
const { userController } = require("../../app/controllers");
const authorize = require("../../middlewares/authorize");
const roleCheck = require("../../middlewares/roleCheck");
const router = express.Router();

router.get("/users", authorize, roleCheck(["superadmin", "admin"]), userController.getAllUser);
router.delete(
  "/users/:id",
  authorize,
  roleCheck(["superadmin", "admin"]),
  userController.deleteUser
);

module.exports = router;
