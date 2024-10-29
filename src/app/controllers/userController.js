const { userService } = require("../services");
const apiSuccess = require("../../utils/apiSuccess");

async function getAllUser(req, res, next) {
  const { active } = req.query;
  const userCondition = { paranoid: true };
  // get deleted data too
  if (active == "false") userCondition.paranoid = false;

  try {
    const users = await userService.getAll(userCondition);

    // response success
    apiSuccess(res, 200, "Successfully get all users data", { users });
  } catch (error) {
    next(error);
  }
}

async function getOneUser(req, res, next) {
  const id = req.params.id;
  try {
    const user = await userService.getOne({ where: { id } });

    // response success
    apiSuccess(res, 200, "Successfully get user data", { user });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const id = req.params.id;
  try {
    // soft-delete, because i'm using paranoid feature (default paranoid: true)
    const deletedUser = await userService.softDeleteUser({ where: { id } });

    // response success
    apiSuccess(res, 200, "Successfully deleted user data", { deletedUser });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllUser, getOneUser, deleteUser };
