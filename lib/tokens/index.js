var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.token,
  };
  _.extend(optionsToSend, options.clientOptions);
  delete optionsToSend.accessToken;

  var getAccessToken = (postOptions, callback) => {
    var getTokenQueryStrings = {
      'grant_type': 'authorization_code'
    };
    var combinedQueryParams = {
      queryParameters: _.extend(getTokenQueryStrings, postOptions.queryParameters)
    };
    return requestor.post(_.extend({}, optionsToSend, postOptions, combinedQueryParams), callback);
  };

  var refreshAccessToken = (postOptions, callback) => {
    var getTokenQueryStrings = {
      'grant_type': 'refresh_token'
    };
    var combinedQueryParams = {
      queryParameters: _.extend(getTokenQueryStrings, postOptions.queryParameters)
    };
    return requestor.post(_.extend({}, optionsToSend, postOptions, combinedQueryParams), callback);
  };

  var revokeAccessToken = (deleteOptions, callback) => {
    var accessTokenOptions = {
      accessToken: options.clientOptions.accessToken
    };
    return requestor.delete(_.extend({}, optionsToSend, accessTokenOptions, deleteOptions), callback);
  };

  return {
    getAccessToken : getAccessToken,
    refreshAccessToken : refreshAccessToken,
    revokeAccessToken : revokeAccessToken
  };
};
