const express = require("express");
const { userController, authController } = require("../../app/controllers");
const authorize = require("../../middlewares/authorize");
const roleCheck = require("../../middlewares/roleCheck");
const router = express.Router();

// Role check
router.get("/api/v1/whoami", authorize, roleCheck(["member", "admin"]), (req, res) => {
  res.status(200).json(req.user);
});

// Auth
router.post("/api/v1/login", authController.login);
router.post("/api/v1/register", authController.userRegister);
router.get("/api/v1/auth", authController.getAllUserAuth);

router.get("/api/v1/users", userController.getAllUser);
router.get("/api/v1/users/:id", userController.getOneUser);
router.delete("/api/v1/users/:id", userController.deleteUser);

module.exports = router;
