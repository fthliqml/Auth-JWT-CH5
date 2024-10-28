const bcrypt = require("bcrypt");

const { User } = require("../../app/models");

async function userCreate(User, name, email, password, role) {
  const saltRounds = 10;
  if (!password) {
    return console.log("Password is required !");
  }
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await User.create({ name, email, password: encryptedPassword, role });
  return newUser;
}

// userCreate(User, "Muhammad Fatihul Iqmal", "iqmal.example@mail.com", "iqmal123", "superadmin");
