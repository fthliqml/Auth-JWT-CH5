const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");

router.use(userRoute);

module.exports = router;
