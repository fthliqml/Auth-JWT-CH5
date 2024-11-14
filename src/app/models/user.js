"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserAuth, { foreignKey: "userId" });
      User.hasMany(models.Car, { foreignKey: "createdBy" });
      User.hasMany(models.Car, { foreignKey: "updatedBy" });
      User.hasMany(models.Car, { foreignKey: "deletedBy" });
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Name can't be null !",
          },
        },
      },
      role: {
        type: DataTypes.ENUM("superadmin", "admin", "member"),
        validate: {
          isIn: {
            args: [["admin", "superadmin", "member"]],
            msg: "Role must be either 'superadmin', 'admin', or 'member'",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("active", "deleted"),
        validate: {
          isIn: {
            args: [["active", "deleted"]],
            msg: "Role must be either 'active' or 'deleted'",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      /**
       * Active soft delete
       * Automatically create column 'deletedAt' on db table
       */
      paranoid: true,
    }
  );
  return User;
};
