const ApiError = require("../../utils/ApiErrorUtils");
const userRepository = require("../repositories/userRepository");

function getAll(condition = {}) {
  return userRepository.getAll(condition);
}

const getOne = async (condition) => {
  if (!condition) {
    // bad request
    throw new ApiError("getOne function need condition params", 400);
  }

  const user = await userRepository.getOne(condition);

  if (!user) {
    // resource not found
    throw new ApiError("Can't find user's spesific data", 404);
  }
  return user;
};

const createUser = (newUser) => {
  return userRepository.createUser(newUser);
};

const softDeleteUser = async (condition) => {
  // check user is exist
  const user = await getOne(condition);
  if (!user) return;

  // updating status to deleted and get deletedUser data
  await updateUser({ status: "deleted" }, condition);

  // soft-delete with paranoid
  await userRepository.deleteUser(condition);

  return getOne({ where: condition.where, paranoid: false });
};

const hardDeleteUser = async (condition) => {
  // check user is exist
  const user = await getOne({ where: condition.where, paranoid: false });
  if (!user) return;

  // hard delete with force: true
  await userRepository.deleteUser({ where: condition.where, force: true });

  return user;
};

const updateUser = async (updatedData, condition = {}) => {
  // check user is exist
  const user = await getOne(condition);
  if (!user) return;

  // update user data
  await userRepository.updateUser(updatedData, condition);

  return getOne(condition);
};

module.exports = { getAll, getOne, createUser, softDeleteUser, hardDeleteUser, updateUser };
