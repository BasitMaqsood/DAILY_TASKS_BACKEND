const express = require('express');
const app = express();
const logging = require('./startup/logging');
const ip = require('ip');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'Daily Tasks API', // Title (required)
      contact: {
        name: 'Basit Maqsood',
      },
    },
  },
  // Path to the API docs
  apis: ['./api/routes/user.js'],
  basePath: '/api',
};

const swaggerDocs = swaggerJsDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

logging();
require('./api/data/db.js')();
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/prod')(app);

const port = process.env.PORT || 5000;

logging.logger.info('Current Environment: ' + process.env.NODE_ENV);

const server = app.listen(port, () =>
  logging.logger.info(
    `NIKIST APIs listening on port ${port}! & ip: ${ip.address()}`
  )
);
