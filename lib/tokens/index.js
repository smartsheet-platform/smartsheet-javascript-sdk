var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;
  
  var baseOptions = {
    url: options.apiUrls.token
  };

  var getAccessToken = (postOptions, callback) => {
    var getTokenQueryStrings = {
      'grant_type': 'authorization_code'
    };
    var combinedQueryParams = {
      queryParameters: _.extend(getTokenQueryStrings, postOptions.queryParameters)
    };
    var optionsToSend = _.extend({}, baseOptions, postOptions, combinedQueryParams);
    return requestor.post(optionsToSend, callback);
  };
  
  var refreshAccessToken = (postOptions, callback) => {
    var getTokenQueryStrings = {
      'grant_type': 'refresh_token'
    };
    var combinedQueryParams = {
      queryParameters: _.extend(getTokenQueryStrings, postOptions.queryParameters)
    };
    var optionsToSend = _.extend({}, baseOptions, postOptions, combinedQueryParams);
    return requestor.post(optionsToSend, callback);
  };
  
  var revokeAccessToken = (deleteOptions, callback) => {
    var accessTokenOptions = {
      accessToken: options.accessToken
    };
    var optionsToSend = _.extend({}, baseOptions, accessTokenOptions, deleteOptions);
    return requestor.delete(optionsToSend, callback);
  };

  return {
    getAccessToken : getAccessToken,
    refreshAccessToken : refreshAccessToken,
    revokeAccessToken : revokeAccessToken
  };
};
