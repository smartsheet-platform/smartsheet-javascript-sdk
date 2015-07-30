var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.sheets,
    accessToken : options.accessToken
  };

  var createSheet = function(postOptions, callback) {
    return utils.post(_.extend(optionsToSend, postOptions), callback);
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

  var createSheetInFolderFromExisting = function(postOptions, callback) {
    return createSheetInFolder(postOptions, callback);
  };

  var createSheetInFolder = function(postOptions, callback) {
    optionsToSend.url = options.apiUrls.folders + postOptions.folderId + '/sheets';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var createSheetInWorkspace = function(postOptions, callback) {
    optionsToSend.url = options.apiUrls.workspaces + postOptions.workspaceId + '/sheets';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var createSheetInWorkspaceFromExisting = function(postOptions, callback) {
    return createSheetInWorkspace(postOptions, callback);
  };

  return {
    createSheet             : createSheet,
    createSheetFromExisting : createSheetFromExisting,
    createSheetInFolder     : createSheetInFolder,
    createSheetInWorkspace  : createSheetInWorkspace
  };
};
