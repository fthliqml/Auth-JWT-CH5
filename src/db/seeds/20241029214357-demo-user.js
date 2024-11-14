"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "Muhammad Fatihul Iqmal",
        role: "superadmin",
        image:
          "https://ik.imagekit.io/iqmal/img_photo.png?updatedAt=1731567691109",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Oktavia Fendi",
        role: "admin",
        image:
          "https://ik.imagekit.io/iqmal/img_photo_2.png?updatedAt=1731567691206",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Aditama Rahman",
        role: "admin",
        image:
          "https://ik.imagekit.io/iqmal/img_photo_3.png?updatedAt=1731567690615",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tito Rahman",
        role: "member",
        image:
          "https://ik.imagekit.io/iqmal/img_photo_3.png?updatedAt=1731567690615",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ihsan Kadavi",
        role: "member",
        image:
          "https://ik.imagekit.io/iqmal/img_photo_3.png?updatedAt=1731567690615",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
