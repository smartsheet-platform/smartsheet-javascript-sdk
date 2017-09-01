var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.sheets,
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var createSheet = function(postOptions, callback) {
    return utils.post(_.extend({}, optionsToSend, postOptions), callback);
  };

  var createSheetFromExisting = function(postOptions, callback) {
    if (postOptions.workspaceId) {
        return createSheetInWorkspace(postOptions, callback);
    } else if (postOptions.folderId) {
        return createSheetInFolder(postOptions, callback);
    } else {
        return createSheet(postOptions, callback);
    }
  };

  var createSheetInFolder = function(postOptions, callback) {
    var urlOptions = {url: options.apiUrls.folders + postOptions.folderId + '/sheets'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var createSheetInWorkspace = function(postOptions, callback) {
    var urlOptions = {url: options.apiUrls.workspaces + postOptions.workspaceId + '/sheets'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var copySheet = function(postOptions, callback) {
    var urlOptions = {url: options.apiUrls.sheets + postOptions.sheetId + '/copy'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  return {
    createSheet             : createSheet,
    createSheetFromExisting : createSheetFromExisting,
    createSheetInFolder     : createSheetInFolder,
    createSheetInWorkspace  : createSheetInWorkspace,
    copySheet               : copySheet
  };
};
