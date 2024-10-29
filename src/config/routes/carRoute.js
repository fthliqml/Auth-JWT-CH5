const express = require("express");
const router = express.Router();

const { carController } = require("../../app/controllers");

router.get("/cars", carController.getAllCar);

module.exports = router;
