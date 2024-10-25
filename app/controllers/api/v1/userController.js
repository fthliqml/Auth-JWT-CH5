const e = require("express");
const userService = require("../../../services/userService");

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

    const newUser = { name, email, password, role };

    newUser.password = await userService.encrpytPassword(newUser.password);

    const user = await userService.createUser(newUser);

    res.status(201).json({
      status: "Success",
      message: "Success create new user",
      isSuccess: true,
      data: { user },
    });
  } catch (error) {
    // Go to error middleware (onError)
    next(error);
  }
}

module.exports = { getAllUser, getDetail, createUser };
