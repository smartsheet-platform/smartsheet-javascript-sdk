var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var getColumns = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions)};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var addColumn = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions)};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var updateColumn = function(putOptions, callback) {
    var urlOptions = {url: buildUrl(putOptions)};
    return utils.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var deleteColumn = function(deleteOptions, callback) {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return utils.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.sheets + urlOptions.sheetId + '/columns/' + (urlOptions.columnId || '');
  };

  return {
    getColumns : getColumns,
    getColumn : getColumns,
    addColumn : addColumn,
    deleteColumn : deleteColumn,
    updateColumn : updateColumn
  };
};
