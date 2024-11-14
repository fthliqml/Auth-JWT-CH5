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

      // Asosiasi dengan User untuk 'createdBy'
      Car.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "created_by",
        onDelete: "SET NULL", // does not work, it should define in migrations
        onUpdate: "CASCADE", // does not work, it should define in migrations
      });

      // Asosiasi dengan User untuk 'updatedBy'
      Car.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "updated_by",
        onDelete: "SET NULL", // does not work, it should define in migrations
        onUpdate: "CASCADE", // does not work, it should define in migrations
      });

      // Asosiasi dengan User untuk 'deletedBy'
      Car.belongsTo(models.User, {
        foreignKey: "deletedBy",
        as: "deleted_by",
        onDelete: "SET NULL", // does not work, it should define in migrations
        onUpdate: "CASCADE", // does not work, it should define in migrations
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
            msg: "Size must be either 'medium', 'small', or 'large'",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      createdBy: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "Size can't be null !",
          },
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
      },
      deletedBy: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Car",
      /* Automatically create deletedAt column (soft-delete) */
      paranoid: true,
    }
  );
  return Car;
};
