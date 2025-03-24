import swaggerJsDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Shortener API",
      version: "1.0.0",
      description: "API for URL shortening",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/modules/routes/*.js"],
};

const specs = swaggerJsDoc(options);

export default specs;
