const express = require("express");
const router = express.Router();

const { swaggerDocs, swaggerUI } = require("../../api-docs/swaggerConf");
const { errorHandler } = require("../../app/controllers");
const userRoute = require("./userRoute");

// API documentation
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
router.use(userRoute);
// Error Handler
router.use(errorHandler.onError);
router.use(errorHandler.onLost);

module.exports = router;
