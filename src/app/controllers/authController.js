const { Sequelize } = require("../models");
const ApiError = require("../../utils/ApiErrorUtils");
const apiSuccess = require("../../utils/apiSuccess");

const { User } = require("../models");

const { userService, userAuthService } = require("../services");

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      // Bad request
      throw new ApiError("Email & password must be provided !", 400);
    }

    // Get user by email
    const userAuth = await userAuthService.getOne({
      where: { email },
      attributes: ["id", "email", "password"],
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "role"],
      },
    });

    if (!userAuth) {
      // Unauthorized
      throw new ApiError("Email not registered !", 401);
    }

    const user = userAuth.user;

    // Password validation
    await userAuthService.checkPassword(password, userAuth.password);

    // Token payload
    const payload = {
      userId: user.id,
      name: user.name,
      email: userAuth.email,
      role: user.role,
    };

    // Create & save refresh token to database
    await userAuthService.createRefreshToken(payload, { where: { email } });

    // Set cookie
    res.cookie("userId", userAuth.id, {
      maxAge: process.env.COOKIE_EXP,
      httpOnly: true,
    });

    apiSuccess(res, 200, "Authorized.", {
      user: payload,
    });
  } catch (error) {
    next(error);
  }
}

async function userRegister(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      // Bad request
      throw new ApiError("All fields (name, email, password, role) must be provided.", 400);
    }

    // check email is valid & doesn't exist
    await userAuthService.emailValidator(email);

    // create user
    const user = await userService.createUser({ name, role });

    // create user auth
    const newUserAuth = { userId: user.id, email, password };
    newUserAuth.password = await userAuthService.encryptPassword(newUserAuth.password);
    const userAuth = await userAuthService.createUserAuth(newUserAuth);

    // response success
    apiSuccess(res, 201, "Successfully registered.", {
      newUser: {
        id: user.id,
        name: user.name,
        email: userAuth.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      const errorMessage = error.errors.map((err) => err.message);
      // Bad request (client)
      return next(new ApiError(errorMessage[0], 400));
    }
    // Go to error middleware (onError)
    next(error);
  }
}

async function getAllUserAuth(req, res, next) {
  try {
    const userAuth = await userAuthService.getAll();
    // response success
    apiSuccess(res, 200, "Successfully get all user auth data", { userAuth });
  } catch (error) {
    // Go to error middleware (onError)
    next(error);
  }
}

async function generateAccessToken(req, res, next) {
  try {
    const id = req.cookies.userId;
    if (!id) {
      // sesi over
      throw new ApiError("Session is over, please login again.", 440);
    }

    const userAuth = await userAuthService.getOne({
      where: { id },
      attributes: ["id", "refreshToken"],
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "role"],
      },
    });

    const user = userAuth.user;

    const payload = {
      userId: user.id,
      name: user.name,
      role: user.role,
    };

    const token = userAuthService.createAccessToken(payload, userAuth.refreshToken);

    // response success
    apiSuccess(res, 200, "Successfully get new access token", { token });
  } catch (error) {
    // Go to error middleware (onError)
    next(error);
  }
}

module.exports = { login, userRegister, getAllUserAuth, generateAccessToken };
