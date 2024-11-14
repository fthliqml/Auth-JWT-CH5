"use strict";

const bcrpyt = require("bcrypt");

const password = bcrpyt.hashSync("admin123", 10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("UserAuths", [
      {
        userId: 1,
        email: "iqmal.example@mail.com",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        email: "okta.example@mail.com",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        email: "adit.example@mail.com",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        email: "tito.example@mail.com",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        email: "ihsan.example@mail.com",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserAuths", null, {});
  },
};
