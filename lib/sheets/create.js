var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.sheets,
    accessToken : options.accessToken
  };

  var createSheet = (postOptions, callback) =>
    requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  var createSheetFromExisting = (postOptions, callback) => {
    if (postOptions.workspaceId) {
        return createSheetInWorkspace(postOptions, callback);
    } else if (postOptions.folderId) {
        return createSheetInFolder(postOptions, callback);
    } else {
        return createSheet(postOptions, callback);
    }
  };

  var createSheetInFolder = (postOptions, callback) => {
    var urlOptions = {url: options.apiUrls.folders + postOptions.folderId + '/sheets'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };
  
  var createSheetInWorkspace = (postOptions, callback) => {
    var urlOptions = {url: options.apiUrls.workspaces + postOptions.workspaceId + '/sheets'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var copySheet = (postOptions, callback) => {
    var urlOptions = {url: options.apiUrls.sheets + postOptions.sheetId + '/copy'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  return {
    createSheet             : createSheet,
    createSheetFromExisting : createSheetFromExisting,
    createSheetInFolder     : createSheetInFolder,
    createSheetInWorkspace  : createSheetInWorkspace,
    copySheet               : copySheet
  };
};
