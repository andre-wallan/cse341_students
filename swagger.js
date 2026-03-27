const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student & Courses API',
      version: '1.0.0',
      description: 'API for managing students and courses with Google OAuth authentication'
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local server' },
      { url: 'https://cse341-students-svsc.onrender.com', description: 'Production server' }
    ],
    components: {
      securitySchemes: {
        googleOAuth: {
          type: 'oauth2',
          flows: {
            implicit: {
              authorizationUrl: '/auth/google',
              scopes: {}
            }
          }
        }
      }
    },
    security: [
      { googleOAuth: [] }
    ]
  },
  apis: ['./routes/*.js'] // make sure your students.js + courses.js are properly documented
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;