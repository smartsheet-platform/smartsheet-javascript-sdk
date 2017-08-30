var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken
  };

  var createUpdateRequest = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions);
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var deleteUpdateRequest = function(deleteOptions, callback) {
    optionsToSend.url = buildUrl(deleteOptions);
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var getUpdateRequest = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getAllUpdateRequests = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var changeUpdateRequest = function(putOptions, callback) {
    optionsToSend.url = buildUrl(putOptions);
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.sheets + urlOptions.sheetId + '/updaterequests/' + (urlOptions.updateRequestId || '');
  };

  return {
    createUpdateRequest : createUpdateRequest,
    deleteUpdateRequest : deleteUpdateRequest,
    getUpdateRequest : getUpdateRequest,
    getAllUpdateRequests : getAllUpdateRequests,
    changeUpdateRequest : changeUpdateRequest
  };
};
