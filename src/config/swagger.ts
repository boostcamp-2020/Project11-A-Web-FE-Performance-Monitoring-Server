import swaggerJSDoc from 'swagger-jsdoc';

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Santry', // Title (required)
    version: process.env.npm_package_version as string, // Version (required)
    description: 'Santry Backend API', // Description (optional)
  },
  // host: 'localhost:3000', // Host (optional)
  // basePath: '/', // Base path (optional)
};

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // Path to the API docs
  // apis: ['./**/swagger.ts'],
  apis: ['./src/swagger/**/*.yaml'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
