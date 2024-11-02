const { userService } = require("../services");
const apiSuccess = require("../../utils/apiSuccess");

async function getAllUser(req, res, next) {
  try {
    // get deleted users too
    const users = await userService.getAll({ paranoid: false });

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
