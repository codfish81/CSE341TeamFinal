const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Flavor Hub API Docs',
        description: 'This is the documentation for Flavor Hub\'s api endpoints',
    },
    host: '',
    schemes: ['http', 'https'],
};

const outputFile = './path/swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);