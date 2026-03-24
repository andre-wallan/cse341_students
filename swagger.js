const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE341 Student API',
      version: '1.0.0',
      description: 'API for managing students with authentication'
    },

    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server'
      },
      {
        url: 'https://cse341-students-svsc.onrender.com',
        description: 'Production server'
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter token like: Bearer YOUR_TOKEN'
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  // IMPORTANT: path to your route files
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;