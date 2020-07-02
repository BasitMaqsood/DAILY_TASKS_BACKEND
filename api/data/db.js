const mongoose = require('mongoose');
const winstonLogger = require('./../../startup/logging').logger;
const config = require('config');
mongoose.Promise = require('bluebird');

module.exports = function () {
  const db = config.get('db');
  winstonLogger.info('DB is: ' + db);
  mongoose.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: false,
  });

  // CONNECTION EVENTS
  mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + db);
    winstonLogger.info('Mongoose connected to ' + db);
  });

  mongoose.connection.on('error', function (err) {
    winstonLogger.error('Mongoose connection error: ' + err);
  });

  mongoose.connection.on('disconnected', function () {
    winstonLogger.info('Mongoose disconnected');
  });
};
