const swaggerJsdoc = require("swagger-jsdoc");

const options = {

 definition: {
  openapi: "3.0.0",
  info: {
   title: "Greenstore API",
   version: "1.0.0",
   description: "Simple ecommerce REST API"
  },

  servers: [
   {
    url: "http://localhost:5000"
   }
  ]

 },

 apis: ["./routes/*.js"]

};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;