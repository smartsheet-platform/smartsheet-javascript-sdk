var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken
  };

  var addAlternateEmail = function(postOptions, callback) {
    optionsToSend.url = buildUrl();
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var buildUrl = function(userId, alternateEmailId) {
    return options.apiUrls.users + userId + '/alternateemails/' + alternateEmailId;
  };
  
  return {
    addAlternateEmail: addAlternateEmail
  };
};
