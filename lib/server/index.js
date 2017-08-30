var utils = require('../utils/httpUtils.js');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.server,
    urls : options.apiUrls,
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var getInfo = function(getOptions, callback) {
    return utils.get(optionsToSend, callback);
  };

  return {
    getInfo : getInfo
  };
};
