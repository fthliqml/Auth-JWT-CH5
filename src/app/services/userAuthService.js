const { userAuthRepository } = require("../repositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ApiError = require("../../utils/ApiErrorUtils");

function getAll() {
  return userAuthRepository.getAll();
}

const getOne = (condition) => {
  return userAuthRepository.getOne(condition);
};

const createUserAuth = async (newUserAuth) => {
  return userAuthRepository.createUserAuth(newUserAuth);
};

const updateUserAuth = async (updatedData, condition) => {
  return userAuthRepository.updateUserAuth(updatedData, condition);
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
      // indicates that a request was unsuccessful because the client did not provide valid authentication credential
      if (!isPasswordCorrect) reject(new ApiError("Incorrect password !", 401));

      resolve(isPasswordCorrect);
    });
  });
}

async function emailValidator(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    // Bad request
    throw new ApiError("Invalid email format.", 400);
  }

  const authIsExisting = await userAuthRepository.getOne({ where: { email } });
  if (authIsExisting) {
    // Bad request
    throw new ApiError("Email already in use.", 400);
  }
}

function createAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_PRIVATEKEY, {
    expiresIn: process.env.JWT_ACCESSTOKEN_EXP,
  });
}

async function createRefreshToken(payload, userCondition) {
  const refreshToken = jwt.sign(payload, process.env.JWT_PRIVATEKEY, {
    expiresIn: process.env.JWT_REFRESHTOKEN_EXP,
  });

  await updateUserAuth({ refreshToken }, userCondition);

  return refreshToken;
}

function isValidToken(token) {
  try {
    const tokenPayload = jwt.verify(token, process.env.JWT_PRIVATEKEY);
    return tokenPayload;
  } catch (error) {
    return false;
  }
}

function getPayloadExpToken(token) {
  return jwt.decode(token);
}

module.exports = {
  getAll,
  createUserAuth,
  updateUserAuth,
  getOne,
  encryptPassword,
  checkPassword,
  emailValidator,
  createAccessToken,
  createRefreshToken,
  isValidToken,
  getPayloadExpToken,
};
