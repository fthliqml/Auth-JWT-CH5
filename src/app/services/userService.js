const userRepository = require("../repositories/userRepository");

function getAll(condition = {}) {
  return userRepository.getAll(condition);
}

const getOne = (condition = {}) => {
  return userRepository.getOne(condition);
};

const createUser = (newUser) => {
  return userRepository.createUser(newUser);
};

const deleteUser = (condition = {}) => {
  return userRepository.deleteUser(condition);
};

const updateUser = (updatedData, condition = {}) => {
  return userRepository.updateUser(updatedData, condition);
};

module.exports = { getAll, getOne, createUser, deleteUser, updateUser };
