const ApiError = require("../../utils/ApiErrorUtils");

const { userService } = require("../services");

async function getAllUser(req, res, next) {
  const { active } = req.query;
  const userCondition = { paranoid: true };

  // get deleted data
  if (active == "false") userCondition.paranoid = false;

  try {
    const users = await userService.getAll(userCondition);
    res.status(200).json({
      status: "Success",
      message: "Successfully get all users data",
      isSuccess: true,
      data: { users },
    });
  } catch (error) {
    next(error);
  }
}

async function getOneUser(req, res, next) {
  const id = req.params.id;
  try {
    const user = await userService.getOne({ where: { id } });
    if (!user) {
      // resource not found
      throw new ApiError("Can't find user's spesific data", 404);
    }

    res.status(200).json({
      status: "Success",
      message: "Successfuly get user data",
      isSuccess: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const id = req.params.id;
  try {
    const user = await userService.getOne({ where: { id }, paranoid: false });
    if (!user) {
      // resource not found
      throw new ApiError("User not found !", 404);
    }

    // updating status to deleted
    await userService.updateUser({ status: "deleted" }, { where: { id } });

    // soft-delete, because i'm using paranoid feature
    await userService.deleteUser({ where: { id } });

    // send update to respond
    user.status = "deleted";
    user.deletedAT = new Date();

    res.status(200).json({
      status: "Success",
      message: "Successfully deleted user data",
      isSuccess: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllUser, getOneUser, deleteUser };
