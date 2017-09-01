var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var createUpdateRequest = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions)};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var deleteUpdateRequest = function(deleteOptions, callback) {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return utils.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var getUpdateRequest = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions)};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var getAllUpdateRequests = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions)};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var changeUpdateRequest = function(putOptions, callback) {
    var urlOptions = {url: buildUrl(putOptions)};
    return utils.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
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
