const { UserAuth } = require("../models");

const getAll = () => {
  return UserAuth.findAll();
};

const createUserAuth = (newUserAuth) => {
  return UserAuth.create(newUserAuth);
};

const getOne = (condition) => {
  return UserAuth.findOne(condition);
};

const updateUserAuth = (updatedData, condition) => {
  return UserAuth.update(updatedData, condition);
};

module.exports = {
  getAll,
  createUserAuth,
  getOne,
  updateUserAuth,
};
