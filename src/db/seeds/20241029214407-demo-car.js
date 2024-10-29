"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Cars", [
      {
        name: "Toyota Innova Zenix",
        model: "Sedan",
        year: 2020,
        size: "medium",
        createdBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Honda Civic",
        model: "Sedan",
        year: 2019,
        size: "medium",
        createdBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Daihatsu Terios",
        model: "SUV",
        year: 2021,
        size: "large",
        createdBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Suzuki Swift",
        model: "Hatchback",
        year: 2018,
        size: "small",
        createdBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mazda CX-5",
        model: "SUV",
        year: 2022,
        size: "large",
        createdBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toyota Yaris",
        model: "Hatchback",
        year: 2020,
        size: "small",
        createdBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Honda BR-V",
        model: "SUV",
        year: 2021,
        size: "medium",
        createdBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hyundai Tucson",
        model: "SUV",
        year: 2019,
        size: "large",
        createdBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nissan March",
        model: "Hatchback",
        year: 2018,
        size: "small",
        createdBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kia Seltos",
        model: "SUV",
        year: 2022,
        size: "medium",
        createdBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
