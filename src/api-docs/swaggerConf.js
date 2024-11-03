const swaggerUI = require("swagger-ui-express"); // Make UI for API documentation
const swaggerJsDoc = require("swagger-jsdoc"); // Simplify make new API documentation by annotation
const fs = require("fs");
const yaml = require("js-yaml");

const swaggerDefinition = yaml.load(fs.readFileSync("./src/api-docs/swagger.yaml", "utf-8"));

// swagger setup
const swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./src/api-docs/*.yaml"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUI };
