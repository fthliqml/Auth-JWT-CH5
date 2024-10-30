const express = require("express");
const router = express.Router();

const { carController } = require("../../app/controllers");
const authorize = require("../../middlewares/authorize");
const roleCheck = require("../../middlewares/roleCheck");

router.get("/cars", authorize, carController.getAllCar);
router.post("/cars", authorize, roleCheck(["superadmin", "admin"]), carController.createNewCar);
router.patch(
  "/cars/:id",
  authorize,
  roleCheck(["superadmin", "admin"]),
  carController.updateCarData
);

module.exports = router;
