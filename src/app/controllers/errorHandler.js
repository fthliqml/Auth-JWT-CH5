const ApiError = require("../../utils/ApiErrorUtils");

function onLost(req, res) {
  res.status(404).json({
    status: "Failed",
    message: "Route not found!",
    isSuccess: false,
    data: null,
  });
}

function onError(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  if (error instanceof ApiError) {
    return res.status(statusCode).json({
      status: "Failed",
      error: error.message,
      isSuccess: false,
      data: null,
    });
  }

  res.status(500).json({
    status: "Failed",
    error: error.message || "An unexpected error occurred",
    isSuccess: false,
    data: null,
  });
}

module.exports = { onLost, onError };
