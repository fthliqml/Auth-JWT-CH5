const bcrypt = require("bcrypt");

const { User } = require("./app/models");

async function userCreate(User, name, email, password, role) {
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await User.create({ name, email, password: encryptedPassword, role });
  return newUser;
}

userCreate(User, "Oktavia Fendi", "okta.example@mail.com", "oketapia", "superadmin").then(
  (value) => {
    console.log(value);
  }
);
