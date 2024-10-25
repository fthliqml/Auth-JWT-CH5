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
      User.hasMany(models.Car, { foreignKey: "userId" });
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
        allowNull: false,
        type: DataTypes.ENUM("superadmin", "admin", "member"),
        validate: {
          isIn: {
            args: [["admin", "superadmin", "member"]],
            msg: "Role must be either 'superadmin', 'admin', or 'member'",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
