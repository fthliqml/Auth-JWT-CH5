const { Sequelize } = require("../models");
const ApiError = require("../../utils/ApiErrorUtils");
const apiSuccess = require("../../utils/apiSuccess");

const { userService, userAuthService } = require("../services");

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      // Bad request
      throw new ApiError("Email & password must be provided !", 400);
    }

    const user = await userAuthService.getOne({ where: { email } });

    await userAuthService.checkPassword(password, user.password);

    const token = userAuthService.createToken(user);

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
        role: user.role,
        status: user.status,
        email: userAuth.email,
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

module.exports = { login, userRegister, getAllUserAuth };
