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
      id: user.id,
      name: user.name,
      email: userAuth.email,
      role: user.role,
    };

    // Create & save refresh token to database
    await userAuthService.createRefreshToken(payload, {
      where: { email },
    });

    // Generate access token
    const accessToken = userAuthService.createAccessToken(payload);

    // Send accessToken to http only cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    apiSuccess(res, 200, "Authorized.", {
      user: {
        userId: user.id,
        name: user.name,
        email: userAuth.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  const userInfo = userAuthService.getPayloadExpToken(req.cookies.accessToken);
  try {
    if (!userInfo) {
      // unauthorized, cookies needed
      throw new ApiError("You are not authorized. Please login", 401);
    }
    // set refresh token to null
    await userAuthService.updateUserAuth(
      { refreshToken: null },
      { where: { id: userInfo.id } }
    );
    res.clearCookie("accessToken");
    apiSuccess(res, 200, "Successfully logout.", null);
  } catch (error) {
    next(error);
  }
}

async function userRegister(req, res, next) {
  const { name, email, password } = req.body;
  try {
    const admin = req.user;
    const role = admin ? "admin" : undefined;

    if (!name || !email || !password) {
      // Bad request
      throw new ApiError(
        "All fields (name, email, password, role) must be provided.",
        400
      );
    }

    // check email is valid & doesn't exist
    await userAuthService.emailValidator(email);

    // superadmin create new admin or member register
    const newUserData = admin ? { name, role } : { name };

    // create user
    const user = await userService.createUser(newUserData); // if role = undefined -> role = member (defaultValue)

    // create user auth
    const newUserAuth = { userId: user.id, email, password };
    newUserAuth.password = await userAuthService.encryptPassword(
      newUserAuth.password
    );
    const userAuth = await userAuthService.createUserAuth(newUserAuth);

    // response success
    apiSuccess(res, 201, "Successfully registered.", {
      User: {
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

async function getCurrentUser(req, res, next) {
  const id = req.user.id;
  try {
    const userAuth = await userAuthService.getOne({
      where: { id },
      attributes: ["id", "email"],
      include: {
        model: User,
        as: "user",
        attributes: ["name", "role", "image"],
      },
    });

    if (!userAuth) {
      // resource not found
      throw new ApiError("Can't find user's data !", 404);
    }

    const currUser = {
      id: userAuth.id,
      email: userAuth.email,
      name: userAuth.user.name,
      image: userAuth.user.image,
      role: userAuth.user.role,
    };

    apiSuccess(res, 200, "Successfully get current user", { user: currUser });
  } catch (error) {
    next(error);
  }
}

async function getAllUserAuth(req, res, next) {
  try {
    const userAuth = await userAuthService.getAll({
      attributes: {
        exclude: ["id"],
      },
    });
    // response success
    apiSuccess(res, 200, "Successfully get all user auth data", { userAuth });
  } catch (error) {
    // Go to error middleware (onError)
    next(error);
  }
}

async function generateAccessToken(req, res, next) {
  // get payload from accessToken
  const userInfo = userAuthService.getPayloadExpToken(req.cookies.accessToken);
  try {
    if (!userInfo) {
      // session over
      throw new ApiError("Session is over, please login again.", 401);
    }

    const id = userInfo.id;

    const userAuth = await userAuthService.getOne({
      where: { id },
      attributes: ["id", "refreshToken"],
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "role"],
      },
    });

    if (!userAuthService.isValidToken(userAuth.refreshToken)) {
      // session over
      throw new ApiError("Token is expired, please login again.", 401);
    }

    const user = userAuth.user;

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = userAuthService.createAccessToken(payload);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    // response success
    apiSuccess(res, 200, "Successfully get new access token", { token });
  } catch (error) {
    // Go to error middleware (onError)
    next(error);
  }
}

module.exports = {
  login,
  logout,
  userRegister,
  getAllUserAuth,
  generateAccessToken,
  getCurrentUser,
};
