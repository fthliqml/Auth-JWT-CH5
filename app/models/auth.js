"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Auth.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "user",
        onDelete: "SET NULL", // Default
        onUpdate: "CASCADE", // Default
      });
    }
  }
  Auth.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "UserId can't be null !",
          },
        },
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Email can't be null !",
          },
          isEmail: {
            msg: "Email does not match the format !",
          },
        },
      },
      password: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Password can't be null !",
          },
        },
      },
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Auth",
    }
  );
  return Auth;
};
