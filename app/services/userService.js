const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function getAll() {
  return userRepository.getAll();
}

const getDetail = (id) => {
  return userRepository.getDetail(id);
};

const createUser = async (newUser) => {
  return userRepository.createUser(newUser);
};

module.exports = { getAll, getDetail, createUser };
