const swaggerUI = require("swagger-ui-express"); // Make UI for API documentation
const swaggerJsDoc = require("swagger-jsdoc"); // Simplify make new API documentation by annotation

// swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "Oauth Users and CRUD Cars Data",
      version: "1.0.0",
      description: "API documentation",
    },
    components: {
      schemas: {
        User: {
          type: "object", // Indicates type data of User per item
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Kairi Reyosdelsol",
            },
            role: {
              type: "string",
              example: "Member",
            },
            createdAt: {
              type: "datetime",
              example: "2024-10-25T21:07:38.601Z",
            },
            updatedAt: {
              type: "datetime",
              example: "2024-10-25T21:07:38.601Z",
            },
          },
        },
      },
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
  apis: ["./src/api-docs/*.yaml"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUI };
