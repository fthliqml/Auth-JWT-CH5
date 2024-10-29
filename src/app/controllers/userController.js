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
    // soft-delete, because i'm using paranoid feature (default paranoid: true)
    const deletedUser = await userService.softDeleteUser({ where: { id } });
    // const deletedUser = await userService.hardDeleteUser({ where: { id } });

    res.status(200).json({
      status: "Success",
      message: "Successfully deleted user data",
      isSuccess: true,
      data: { deletedUser },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllUser, getOneUser, deleteUser };
