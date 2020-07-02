const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./../api/middleware/error.middleware');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./../api/routes/user');
const dailyTaskRoutes = require('./../api/routes/task');

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  /* Logging every request  */
  app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
  });

  /* For Cors Issue */

  const allowedOrigins = [
    'http://localhost:4000',
    'http://localhost:5000',
    'http://localhost:3000',
    'http://localhost:8000',
    'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop',
    'https://nikist-admin.netlify.app',
  ];

  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        // return callback(null, true);
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            'The CORS policy for this site does not ' +
            'allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );

  app.use(express.json());
  app.get('/', ({}, res) => res.send('Hello World!'));
  app.get('/api', ({}, res) => res.send('Hello API World!'));

  app.use('/api/user', userRoutes);
  app.use('/api/task', dailyTaskRoutes);
  app.use(errorHandler.errorMiddleware);
};
