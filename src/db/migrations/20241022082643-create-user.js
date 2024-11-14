"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM("superadmin", "admin", "member"),
        defaultValue: "member",
      },
      image: {
        type: Sequelize.STRING,
        defaultValue:
          "https://ik.imagekit.io/iqmal/img_photo_3.png?updatedAt=1731567690615",
      },
      status: {
        type: Sequelize.ENUM("active", "deleted"),
        defaultValue: "active",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deletedAt: {
        // automatically filled by paranoid
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
    // delete enum type
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Users_role";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Users_status";'
    );
  },
};
