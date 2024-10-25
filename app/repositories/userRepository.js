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

const getByEmail = (email) => {
  return User.findOne({ where: { email } });
};

module.exports = {
  getAll,
  getDetail,
  createUser,
  getByEmail,
};
