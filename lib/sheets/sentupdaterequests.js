var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var deleteSentUpdateRequest = function(deleteOptions, callback) {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return utils.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var getSentUpdateRequest = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions)};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var getAllSentUpdateRequests = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions)};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.sheets + urlOptions.sheetId + '/sentupdaterequests/' + (urlOptions.sentUpdateRequestId || '');
  };

  return {
    deleteSentUpdateRequest : deleteSentUpdateRequest,
    getSentUpdateRequest: getSentUpdateRequest,
    getAllSentUpdateRequests: getAllSentUpdateRequests
  };
};
