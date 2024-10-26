const swaggerUI = require("swagger-ui-express"); // Make UI for API documentation
const swaggerJsDoc = require("swagger-jsdoc"); // Simplify make new API documentation by anonation

// swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "Oauth Users and CRUD Cars Data",
      version: "1.0.0",
      description: "API documentation",
    },
    tags: [
      {
        name: "User",
        description: "Operations related to user",
      },
      {
        name: "Car",
        description: "Operations related to car",
      },
    ],
    servers: [
      {
        url: `http://localhost:3000`,
      },
    ],
  },
  apis: ["./api-docs/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUI };
