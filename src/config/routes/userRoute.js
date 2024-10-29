const express = require("express");
const { userController } = require("../../app/controllers");
const router = express.Router();

router.get("/api/v1/users", userController.getAllUser);
router.get("/api/v1/users/:id", userController.getOneUser);
router.delete("/api/v1/users/:id", userController.deleteUser);

module.exports = router;
