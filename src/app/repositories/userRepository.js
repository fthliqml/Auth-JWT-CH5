const { User } = require("../models");

const getAll = () => {
  return User.findAll();
};

const getDetail = (id) => {
  return User.findByPk(id);
};

const createUser = (newUser) => {
  return User.create(newUser);
};

module.exports = {
  getAll,
  getDetail,
  createUser,
};
