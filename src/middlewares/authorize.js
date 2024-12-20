const { userAuthService } = require("../app/services");
const ApiError = require("../utils/ApiErrorUtils");

module.exports = async function authorize(req, res, next) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new ApiError("Token is missing, malformatted, or expired", 401);
    }

    const userPayload = userAuthService.isValidToken(token);

    if (!userPayload) {
      // Unauthorized
      throw new ApiError("Token is expired", 401);
    }

    req.user = userPayload;

    next();
  } catch (error) {
    next(error);
  }
};
