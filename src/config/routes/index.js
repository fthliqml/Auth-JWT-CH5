const express = require("express");
const router = express.Router();

const { swaggerDocs, swaggerUI } = require("../../api-docs/swaggerConf");
const { errorHandler } = require("../../app/controllers");
const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const carRoute = require("./carRoute");

// API documentation
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
router.use("/api/v1", userRoute);
router.use("/api/v1", authRoute);
router.use("/api/v1", carRoute);
// Error Handlers
router.use(errorHandler.onError);
router.use(errorHandler.onLost);

module.exports = router;
