const { Sequelize } = require("../models");
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

async function userRegister(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      const error = new ApiError("All fields (name, email, password, role) must be provided.", 400);
      // Bad request
      return next(error);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const error = new ApiError("Invalid email format.", 400);
      // Bad request
      return next(error);
    }

    const authIsExisting = await userAuthService.getByEmail(email);
    if (authIsExisting) {
      const error = new ApiError("Email already in use.", 400);
      // Bad request
      return next(error);
    }

    const newUser = { name, role };
    const user = await userService.createUser(newUser);

    const newUserAuth = { userId: user.id, email, password };
    newUserAuth.password = await userAuthService.encryptPassword(newUserAuth.password);
    const userAuth = await userAuthService.createUserAuth(newUserAuth);

    res.status(201).json({
      status: "Success",
      message: "Success created new user",
      isSuccess: true,
      data: {
        newUser: {
          id: user.id,
          name: user.name,
          role: user.role,
          status: user.status,
          email: userAuth.email,
          password: userAuth.password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      const errorMessage = error.errors.map((err) => err.message);
      // Bad request (client)
      return next(new ApiError(errorMessage[0], 400));
    }

    // Go to error middleware (onError)
    next(new ApiError(error.message, 500));
  }
}

async function getAllUserAuth(req, res, next) {
  try {
    const userAuth = await userAuthService.getAll();
    res.status(200).json({
      status: "Success",
      message: "Success get all user",
      isSuccess: true,
      data: { userAuth },
    });
  } catch (error) {
    // Server can't processing a request
    next(new ApiError(error.message, 500));
  }
}

module.exports = { login, userRegister, getAllUserAuth };
