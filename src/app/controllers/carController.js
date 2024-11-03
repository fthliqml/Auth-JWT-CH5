const { Sequelize, User } = require("../models");

const { carService } = require("../services");

const apiSuccess = require("../../utils/apiSuccess");
const ApiError = require("../../utils/ApiErrorUtils");

async function getAllCar(req, res, next) {
  try {
    const cars = await carService.getAll({
      order: [["id", "ASC"]],
      attributes: {
        exclude: ["createdBy", "updatedBy", "deletedBy", "deletedAt"],
      },
      include: [
        {
          model: User,
          as: "created_by",
          attributes: ["id", "name", "role"],
        },
        {
          model: User,
          as: "updated_by",
          attributes: ["id", "name", "role"],
        },
        {
          model: User,
          as: "deleted_by",
          attributes: ["id", "name", "role"],
        },
      ],
    });

    apiSuccess(res, 200, "Successfully get all cars data", { cars });
  } catch (error) {
    next(error);
  }
}

async function createNewCar(req, res, next) {
  const { name, model, year, size } = req.body;
  const userId = req.user.id;
  try {
    if (!name || !model || !year || !size) {
      // bad request
      throw new ApiError("All fields (name, model, year. size) must be provided !", 400);
    }

    const newCar = await carService.createCar({ name, model, year, size, createdBy: userId });

    apiSuccess(res, 201, "Successfully created new car data", { car: newCar });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      const errorMessage = error.errors.map((err) => err.message);
      // Bad request (client)
      return next(new ApiError(errorMessage[0], 400));
    }
    next(error);
  }
}

async function updateCarData(req, res, next) {
  const { name, model, year, size } = req.body;
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const car = await carService.getOne({ where: { id } });

    const updatedData = {
      name: name || car.name,
      model: model || car.model,
      year: year || car.year,
      size: size || car.size,
      updatedBy: userId,
    };

    // Update database
    const updatedCar = await carService.updateCar(updatedData, {
      where: {
        id,
      },
      attributes: ["id", "name", "model", "year", "size"],
      include: {
        model: User,
        as: "updated_by",
        attributes: ["id", "name", "role"],
      },
    });

    apiSuccess(res, 200, "Successfully updated car data", { updatedCar });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      const errorMessage = error.errors.map((err) => err.message);
      // Bad request (client)
      return next(new ApiError(errorMessage[0], 400));
    }
    next(error);
  }
}

async function deleteCarData(req, res, next) {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const deletedCar = await carService.softDelete(
      {
        where: {
          id,
        },
        attributes: ["id", "name", "model", "year", "size"],
        include: {
          model: User,
          as: "deleted_by",
          attributes: ["id", "name", "role"],
        },
      },
      userId // deletedBy
    );

    apiSuccess(res, 200, "Successfully deleted car data", { deletedCar });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllCar, createNewCar, updateCarData, deleteCarData };
