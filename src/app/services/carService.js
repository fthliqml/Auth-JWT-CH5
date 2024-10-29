const { carRepository } = require("../repositories");

function getAll(condition = {}) {
  return carRepository.getAll(condition);
}

module.exports = { getAll };
