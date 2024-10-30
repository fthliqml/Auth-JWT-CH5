const apiSuccess = (res, statusCode, message, resData) => {
  const data = resData ? { ...resData } : null;
  res.status(statusCode).json({
    status: "Success",
    message: message,
    isSuccess: true,
    data,
  });
};

module.exports = apiSuccess;
