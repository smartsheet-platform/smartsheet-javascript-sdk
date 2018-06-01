var _ = require('underscore');
var headers = require('../utils/constants.js').acceptHeaders;

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.sheets
  };
  _.extend(optionsToSend, options.clientOptions);


  var createSheet = (postOptions, callback) =>
    requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  var createSheetFromExisting = (postOptions, callback) => {
    var options = JSON.parse(JSON.stringify(postOptions));
    if (options.workspaceId) {
        return createSheetInWorkspace(options, callback);
    } else if (options.folderId) {
        return createSheetInFolder(options, callback);
    } else {
        return createSheet(options, callback);
    }
  };

  var createSheetInFolder = (postOptions, callback) => {
    var urlOptions = {url: buildFolderUrl(postOptions)};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var createSheetInWorkspace = (postOptions, callback) => {
    var urlOptions = {url: buildWorkspaceUrl(postOptions)};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var copySheet = (postOptions, callback) => {
    var urlOptions = {url: options.apiUrls.sheets + postOptions.sheetId + '/copy'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var importSheet = (postOptions, callback, contentType, baseUrl) => {
    var urlOptions = {
      url: baseUrl +  'import',
      contentType: contentType,
      contentDisposition: 'attachment'
    };
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions));
  };

  var importXlsxAndReplaceSheet = (postOptions, callback) => {
    var baseUrl = options.apiUrls.sheets + postOptions.sheetId + "/";
    return importSheet(postOptions, callback, headers.vndOpenXml, baseUrl);
  };

  var importCsvAndReplaceSheet = (postOptions, callback) => {
    var baseUrl = options.apiUrls.sheets + postOptions.sheetId + "/";
    return importSheet(postOptions, callback, headers.textCsv, baseUrl);
  };

  var importXlsxSheet = (postOptions, callback) => {
    return importSheet(postOptions, callback, headers.vndOpenXml, options.apiUrls.sheets);
  };

  var importCsvSheet = (postOptions, callback) => {
    return importSheet(postOptions, callback, headers.textCsv, options.apiUrls.sheets);
  };

  var importXlsxSheetIntoFolder = (postOptions, callback) => {
    return importSheet(postOptions, callback, headers.vndOpenXml, buildFolderUrl(postOptions) + "/");
  };

  var importCsvSheetIntoFolder = (postOptions, callback) => {
    return importSheet(postOptions, callback, headers.textCsv, buildFolderUrl(postOptions) + "/");
  };

  var importXlsxSheetIntoWorkspace = (postOptions, callback) => {
    return importSheet(postOptions, callback, headers.vndOpenXml, buildWorkspaceUrl(postOptions) + "/");
  };

  var importCsvSheetIntoWorkspace = (postOptions, callback) => {
    return importSheet(postOptions, callback, headers.textCsv, buildWorkspaceUrl(postOptions) + "/");
  };

  var buildFolderUrl = (requestOptions) => {
    return options.apiUrls.folders + requestOptions.folderId + '/sheets';
  };

  var buildWorkspaceUrl = (requestOptions) => {
    return options.apiUrls.workspaces + requestOptions.workspaceId + '/sheets'
  }

  return {
    createSheet                  : createSheet,
    createSheetFromExisting      : createSheetFromExisting,
    createSheetInFolder          : createSheetInFolder,
    createSheetInWorkspace       : createSheetInWorkspace,
    copySheet                    : copySheet,
    // Not yet released in the API
    // importCsvAndReplaceSheet     : importCsvAndReplaceSheet,
    // importXlsxAndReplaceSheet    : importXlsxAndReplaceSheet,
    importCsvSheet               : importCsvSheet,
    importXlsxSheet              : importXlsxSheet,
    importCsvSheetIntoFolder     : importCsvSheetIntoFolder,
    importXlsxSheetIntoFolder    : importXlsxSheetIntoFolder,
    importCsvSheetIntoWorkspace  : importCsvSheetIntoWorkspace,
    importXlsxSheetIntoWorkspace : importXlsxSheetIntoWorkspace,
  };
};
