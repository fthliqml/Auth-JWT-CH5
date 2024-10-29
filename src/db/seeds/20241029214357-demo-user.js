"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "Muhammad Fatihul Iqmal",
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Oktavia Fendi",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Aditama Rahman",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tito Rahman",
        role: "member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ihsan Kadavi",
        role: "member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
