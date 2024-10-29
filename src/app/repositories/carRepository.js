const { Car } = require("../models");

const getAll = (condition) => {
  return Car.findAll(condition);
};

module.exports = { getAll };
