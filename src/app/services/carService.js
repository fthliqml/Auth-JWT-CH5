const ApiError = require("../../utils/ApiErrorUtils");
const { carRepository } = require("../repositories");

const getAll = (condition = {}) => {
  return carRepository.getAll(condition);
};

const count = (condition = {}) => {
  return carRepository.count(condition);
};

const getOne = async (condition) => {
  const car = await carRepository.getOne(condition);
  if (!car) {
    // resource not found
    throw new ApiError("Can't find car's specific data", 404);
  }
  return car;
};

const createCar = (newCar) => {
  return carRepository.createCar(newCar);
};

const updateCar = async (updatedData, condition) => {
  await carRepository.updateCar(updatedData, condition); // will return 1 if success

  return getOne(condition);
};

const softDelete = async (condition, deletedBy) => {
  // check existing user
  await getOne(condition);

  await carRepository.updateCar({ deletedBy }, condition);
  // automatically update 'deleteAt' field because using paranoid
  await carRepository.deleteCar(condition);

  // return deleted data
  return getOne({ ...condition, paranoid: false }); // combining condition with paranoid: false
};

module.exports = { getAll, getOne, createCar, updateCar, softDelete, count };
