import swaggerJsDoc from "swagger-jsdoc";
import fs from "fs";

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
fs.writeFileSync("./swagger.json", JSON.stringify(specs, null, 2));
console.log("Swagger JSON file generated successfully!");

export default specs;
