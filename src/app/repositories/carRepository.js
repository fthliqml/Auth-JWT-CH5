const { Car } = require("../models");

const getAll = (condition) => {
  return Car.findAll(condition);
};

const getOne = (condition) => {
  return Car.findOne(condition);
};

const createCar = (newCar) => {
  return Car.create(newCar);
};

const deleteCar = (condition) => {
  return Car.destroy(condition);
};

const updateCar = (updatedData, condition) => {
  return Car.update(updatedData, condition);
};

module.exports = { getAll, getOne, createCar, deleteCar, updateCar };
