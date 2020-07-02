const winstonLogger = require('./../../startup/logging').logger;

module.exports.errorMiddleware = function (err, req, res, next) {
  console.log('Something failed: ', err);
  winstonLogger.error(err.message, err);

  res.status(500).json({ 'Something failed at: ': err });
};
