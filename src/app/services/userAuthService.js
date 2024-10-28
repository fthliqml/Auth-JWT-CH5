const { userAuthRepository } = require("../repositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function getAll() {
  return userAuthRepository.getAll();
}

const getDetail = (id) => {
  return userAuthRepository.getDetail(id);
};

const getByEmail = (email) => {
  return userAuthRepository.getByEmail(email);
};

const createUserAuth = async (newUserAuth) => {
  return userAuthRepository.createUserAuth(newUserAuth);
};

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = 10;
    bcrypt.hash(password, salt, (err, encryptedPassword) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(encryptedPassword);
    });
  });
}

function checkPassword(password, encryptedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(isPasswordCorrect);
    });
  });
}

function createToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return jwt.sign(payload, process.env.JWT_PRIVATEKEY, { expiresIn: "1m" });
}

module.exports = {
  getAll,
  getDetail,
  createUserAuth,
  getByEmail,
  encryptPassword,
  checkPassword,
  createToken,
};
