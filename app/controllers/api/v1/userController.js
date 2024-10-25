const userService = require("../../../services/userService");
const userAuthService = require("../../../services/userAuthService");

async function getAllUser(req, res) {
  try {
    const users = await userService.getAll();
    res.status(200).json({
      status: "Success",
      message: "Success get all user",
      isSuccess: true,
      data: { users },
    });
  } catch (error) {
    // Server can't prosessing a request
    error.statusCode = 422;
    next(error);
  }
}

async function getDetail(req, res, next) {
  const id = req.params.id;
  try {
    const user = await userService.getDetail(id);
    if (!user) {
      const error = new Error("Can't find user's spesific data");
      // Resource not found
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      status: "Success",
      message: "Success get user data",
      isSuccess: true,
      data: { user },
    });
  } catch (error) {
    // Server can't prosessing a request
    error.statusCode = 422;
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      const error = new Error("All fields (name, email, password, role) must be provided.");
      // Bad request
      error.statusCode = 400;
      return next(error);
    }

    const authIsExisting = await userAuthService.getByEmail(email);
    if (authIsExisting) {
      const error = new Error("Email already in use.");
      // Bad request
      error.statusCode = 400;
      return next(error);
    }

    const newUser = { name, role };
    const user = await userService.createUser(newUser);

    const newUserAuth = { userId: user.id, email, password };
    newUserAuth.password = await userAuthService.encrpytPassword(newUserAuth.password);
    const userAuth = await userAuthService.createUserAuth(newUserAuth);

    /* 
    TRANSACTION
    automatically throw error and rollback if there is an error during creating new data
    minus: ID skipped when rollback

    const newUser = await sequelize.transaction(async (t) => {
      const newUser = { name, role };
      const user = await userService.createUser(newUser, { transaction: t });
      
      const newUserAuth = { userId: user.id, email, password };
      newUserAuth.password = await userAuthService.encrpytPassword(newUserAuth.password);
      const userAuth = await userAuthService.createUserAuth(newUserAuth, { transaction: t });
      
      return {
        id: user.id,
        name: user.name,
        role: user.role,
        email: userAuth.email,
        password: userAuth.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
    */

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
    // Go to error middleware (onError)
    next(error);
  }
}

module.exports = { getAllUser, getDetail, createUser };
