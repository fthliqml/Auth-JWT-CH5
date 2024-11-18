const express = require("express");
const router = express.Router();

const { swaggerDocs, swaggerUI } = require("../../api-docs/swaggerConf");
const { errorHandler } = require("../../app/controllers");
const authRoute = require("./authRoute");
const carRoute = require("./carRoute");
const adminRoute = require("./adminRoute");

router.get("/health-check", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Successfully health checking",
    isSuccess: true,
    data: null,
  });
});

// API documentation
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
router.use("/api/v1", authRoute);
router.use("/api/v1", carRoute);
router.use("/api/v1", adminRoute);
// Error Handlers
router.use(errorHandler.onError);
router.use(errorHandler.onLost);

module.exports = router;
