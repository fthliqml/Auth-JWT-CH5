const express = require("express");
const router = express.Router();

const { swaggerDocs, swaggerUI } = require("../../api-docs/swaggerConf");
const controllers = require("../../app/controllers");
const userRoute = require("./userRoute");

// API documentation
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
router.use(userRoute);
// Error Handler
router.use(controllers.api.main.onError);
router.use(controllers.api.main.onLost);

module.exports = router;
