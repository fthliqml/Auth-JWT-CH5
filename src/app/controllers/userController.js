const { Sequelize } = require("../models");
const ApiError = require("../../utils/ApiErrorUtils");

const { userService, userAuthService } = require("../services");

async function getAllUser(req, res, next) {
  try {
    const users = await userService.getAll();
    res.status(200).json({
      status: "Success",
      message: "Success get all user",
      isSuccess: true,
      data: { users },
    });
  } catch (error) {
    // Server can't processing a request
    next(new ApiError(error.message, 500));
  }
}

async function getDetail(req, res, next) {
  const id = req.params.id;
  try {
    const user = await userService.getDetail(id);
    if (!user) {
      const error = new ApiError("Can't find user's spesific data", 404);
      // Resource not found
      return next(error);
    }

    res.status(200).json({
      status: "Success",
      message: "Success get user data",
      isSuccess: true,
      data: { user },
    });
  } catch (error) {
    // Server can't processing a request
    next(new ApiError(error.message, 422));
  }
}

async function createUser(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
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

module.exports = { getAllUser, getDetail, createUser };
