const { User } = require("../models");

const getAll = (condition) => {
  return User.findAll(condition);
};

const getOne = (condition) => {
  return User.findOne(condition);
};

const createUser = (newUser) => {
  return User.create(newUser);
};

const deleteUser = (condition) => {
  return User.destroy(condition);
};

const updateUser = (updatedData, condition) => {
  return User.update(updatedData, condition);
};

module.exports = {
  getAll,
  getOne,
  createUser,
  deleteUser,
  updateUser,
};
