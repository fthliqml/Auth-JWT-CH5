const jwt = require("jsonwebtoken");
const userService = require("../app/services/userService");

async function authorize(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(token, process.env.JWT_PRIVATEKEY);

    // Get user data
    const user = await userService.getDetail(tokenPayload.id);

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      error: "Unauthorized",
      isSuccess: false,
      data: null,
    });
  }
}

module.exports = authorize;
