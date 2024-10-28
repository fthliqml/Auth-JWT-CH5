const ApiError = require("../../utils/ApiErrorUtils");

const { userService } = require("../services");

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

async function deleteUser(req, res, next) {
  const id = req.params.id;
  try {
    const user = await userService.getDetail(id);
    if (!user) {
      // resource not found
      return next(new ApiError("User not found !", 404));
    }

    await userService.deleteUser({ where: { id } });

    res.status(200).json({
      status: "Success",
      message: "Successfully delete user data",
      isSuccess: true,
      data: { user },
    });
  } catch (error) {
    // Server can't processing a request
    next(new ApiError(error.message, 422));
  }
}

module.exports = { getAllUser, getDetail, deleteUser };
