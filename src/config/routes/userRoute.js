const express = require("express");
const { userController } = require("../../app/controllers");
const router = express.Router();

router.get("/users", userController.getAllUser);
router.get("/users/:id", userController.getOneUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
