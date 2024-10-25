const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

function checkPassword(password, encrpytedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encrpytedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
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

module.exports = { encrpytPassword, checkPassword, createToken };
