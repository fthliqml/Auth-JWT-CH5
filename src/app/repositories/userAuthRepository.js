const { UserAuth } = require("../models");

const getAll = () => {
  return UserAuth.findAll();
};

const getDetail = (id) => {
  return UserAuth.findByPk(id);
};

const createUserAuth = (newUserAuth) => {
  return UserAuth.create(newUserAuth);
};

const getByEmail = (email) => {
  return UserAuth.findOne({ where: { email } });
};

module.exports = {
  getAll,
  getDetail,
  createUserAuth,
  getByEmail,
};
