const apiSuccess = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    status: "Success",
    message: message,
    isSuccess: true,
    data: { ...data },
  });
};

module.exports = apiSuccess;
