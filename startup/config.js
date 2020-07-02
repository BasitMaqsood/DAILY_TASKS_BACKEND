const config = require('config');

module.exports = function () {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL Error: jwtPrivatekey is not defind');
  }
};
