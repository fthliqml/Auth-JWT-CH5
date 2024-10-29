const express = require("express");
const router = express.Router();

const { swaggerDocs, swaggerUI } = require("../../api-docs/swaggerConf");
const { errorHandler } = require("../../app/controllers");
const userRoute = require("./userRoute");
const authRoute = require("./authRoute");

// API documentation
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
router.use(userRoute);
router.use(authRoute);
// Error Handler
router.use(errorHandler.onError);
router.use(errorHandler.onLost);

module.exports = router;
