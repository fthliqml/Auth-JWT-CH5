const { carService } = require("../services");

const apiSuccess = require("../../utils/apiSuccess");

async function getAllCar(req, res, next) {
  try {
    const cars = await carService.getAll();

    apiSuccess(res, 200, "Successfully get all cars data", { cars });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllCar };
