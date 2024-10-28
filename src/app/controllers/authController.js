const ApiError = require("../../utils/ApiErrorUtils");

const { userService, userAuthService } = require("../services");

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      const error = new ApiError("Email & password must be provided !", 400);
      // Bad request
      return next(error);
    }

    const user = await userService.getByEmail(email);

    if (!user) {
      const error = new ApiError("Email not found !", 404);
      // Resource not found
      return next(error);
    }

    const isPasswordCorrect = await userAuthService.checkPassword(password, user.password);

    if (!isPasswordCorrect) {
      const error = new ApiError("Wrong password !", 401);
      // indicates that a request was unsuccessful because the client did not provide valid authentication credential
      return next(error);
    }

    const token = userAuthService.createToken(user);
    req.session.accessToken = token;

    // Set access token ke cookie
    res.cookie("accessToken", token, {
      httpOnly: true, // Hanya bisa diakses oleh server, tidak oleh JavaScript
      secure: true, // Hanya kirim cookie melalui HTTPS
      sameSite: "Strict", // Cegah pengiriman cookie ke domain lain
      maxAge: 15 * 60 * 1000, // Cookie akan kadaluarsa sesuai dengan expiry token
    });

    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
}

module.exports = { login };
