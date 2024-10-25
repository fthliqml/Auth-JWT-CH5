"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "user",
        onDelete: "SET NULL", // Default
        onUpdate: "CASCADE", // Default
      });
    }
  }
  Car.init(
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
      model: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Model can't be null !",
          },
        },
      },
      year: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "Year can't be null !",
          },
        },
      },
      size: {
        allowNull: false,
        type: DataTypes.ENUM("small", "medium", "large"),
        validate: {
          notNull: {
            msg: "Size can't be null !",
          },
          isIn: {
            args: [["small", "medium", "large"]],
            msg: "Role must be either 'medium', 'small', or 'large'",
          },
        },
      },
      createdBy: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "'CreatedBy' field can't be null !",
          },
        },
      },
      updatedBy: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "'UpdatedBy' field can't be null !",
          },
        },
      },
      deletedBy: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "'DeletedBy' field can't be null !",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
