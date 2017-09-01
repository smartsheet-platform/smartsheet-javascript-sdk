var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var baseOptions = {
    url: options.apiUrls.token
  };

  var getAccessToken = function(postOptions, callback) {
    var getTokenQueryStrings = {
      'grant_type': 'authorization_code'
    };
    var combinedQueryParams = {
      queryParameters: _.extend(getTokenQueryStrings, postOptions.queryParameters)
    };
    var optionsToSend = _.extend({}, baseOptions, postOptions, combinedQueryParams);
    return utils.post(optionsToSend, callback);
  };
  
  var refreshAccessToken = function(postOptions, callback) {
    var getTokenQueryStrings = {
      'grant_type': 'refresh_token'
    };
    var combinedQueryParams = {
      queryParameters: _.extend(getTokenQueryStrings, postOptions.queryParameters)
    };
    var optionsToSend = _.extend({}, baseOptions, postOptions, combinedQueryParams);
    return utils.post(optionsToSend, callback);
  };
  
  var revokeAccessToken = function(deleteOptions, callback) {
    var accessTokenOptions = {
      accessToken: options.accessToken
    };
    var optionsToSend = _.extend({}, baseOptions, accessTokenOptions, deleteOptions);
    return utils.delete(optionsToSend, callback);
  };

  return {
    getAccessToken : getAccessToken,
    refreshAccessToken : refreshAccessToken,
    revokeAccessToken : revokeAccessToken
  };
};
