const express = require("express");
const { authController } = require("../../app/controllers");
const authorize = require("../../middlewares/authorize");
const router = express.Router();

// Current User Check
router.get("/auth/current-user", authorize, authController.getCurrentUser);

router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.post("/auth/register", authController.userRegister);
router.get("/auth/refresh-token", authController.generateAccessToken);

module.exports = router;
