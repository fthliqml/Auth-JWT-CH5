const { userService } = require("../services");
const apiSuccess = require("../../utils/apiSuccess");

async function getAllUser(req, res, next) {
  const { active } = req.query;
  const userCondition = { paranoid: true };

  if (active == "false") userCondition.paranoid = false; // when paranoid = false -> get soft deleted data too

  try {
    const users = await userService.getAll(userCondition);

    // response success
    apiSuccess(res, 200, "Successfully get all users data", { users });
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

module.exports = { getAllUser, deleteUser };
