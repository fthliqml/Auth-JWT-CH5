const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function getAll() {
  return userRepository.getAll();
}

const getDetail = (id) => {
  return userRepository.getDetail(id);
};

const getByEmail = (email) => {
  return userRepository.getByEmail(email);
};

const createUser = async (newUser) => {
  return userRepository.createUser(newUser);
};

function encrpytPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = 10;
    bcrypt.hash(password, salt, (err, encrpytedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(encrpytedPassword);
    });
  });
}

module.exports = { getAll, getDetail, createUser, getByEmail, encrpytPassword };
