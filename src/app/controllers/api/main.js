const { Sequelize } = require("../../models");

function onLost(req, res) {
  res.status(404).json({
    status: "Failed",
    message: "Route not found!",
  });
}

function onError(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  if (error instanceof Sequelize.ValidationError) {
    const errorMessage = error.errors.map((err) => err.message);
    // Bad request (client)
    return res.status(400).json({
      status: "Failed",
      message: errorMessage[0],
      isSuccess: false,
      data: null,
    });
  }

  // Internal server error
  res.status(statusCode).json({
    status: "Failed",
    error: error.message || "An unexpected error occured",
    isSuccess: false,
    data: null,
  });
}

module.exports = { onLost, onError };
