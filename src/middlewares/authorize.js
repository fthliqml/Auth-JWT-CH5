const { userAuthService } = require("../app/services");
const ApiError = require("../utils/ApiErrorUtils");

module.exports = async function authorize(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      // Unauthorized
      throw new ApiError("Token is missing, malformatted, or expired", 401);
    }

    const token = bearerToken.split("Bearer ")[1];

    const userPayload = userAuthService.isValidToken(token);

    if (!userPayload) {
      // Unauthorized
      throw new ApiError("Token is missing, malformatted, or expired", 401);
    }

    req.user = userPayload;

    next();
  } catch (error) {
    next(error);
  }
};
