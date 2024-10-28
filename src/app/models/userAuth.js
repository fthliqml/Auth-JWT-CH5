"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAuth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserAuth.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE", // Default
      });
    }
  }
  UserAuth.init(
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
        unique: true,
        type: DataTypes.STRING,
      },
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserAuth",
    }
  );
  return UserAuth;
};
