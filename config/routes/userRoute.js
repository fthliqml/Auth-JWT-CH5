const express = require("express");
const controllers = require("../../app/controllers");
const authorize = require("../../middlewares/authorize");
const roleCheck = require("../../middlewares/roleCheck");
const router = express.Router();

// Role check
router.get("/api/v1/whoami", authorize, roleCheck(["member", "admin"]), (req, res) => {
  res.status(200).json(req.user);
});

// API
router.post("/api/v1/login", controllers.api.v1.authController.login);
router.post("/api/v1/register", controllers.api.v1.userController.createUser);

router.get("/api/v1/users", controllers.api.v1.userController.getAllUser);
router.get("/api/v1/users/:id", controllers.api.v1.userController.getDetail);

// Error Handler
router.use(controllers.api.main.onError);
router.use(controllers.api.main.onLost);

module.exports = router;
