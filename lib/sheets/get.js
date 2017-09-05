var _ = require('underscore');
var headers = require('../utils/constants.js').acceptHeaders;

exports.create = function(options) {
  var requestor = options.requestor;
  
  var optionsToSend = {
    url: options.apiUrls.sheets,
    accessToken : options.accessToken
  };

  var listSheets = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  var getSheetAsCSV = (getOptions, callback) =>
    listSheets(_.extend({}, getOptions, {accept:headers.textCsv}), callback);

  var getSheetAsPDF = (getOptions, callback) =>
    listSheets(_.extend({}, getOptions, {accept:headers.applicationPdf}), callback);

  var getSheetAsExcel = (getOptions, callback) =>
    listSheets(_.extend({}, getOptions, {accept:headers.vndMsExcel}), callback);

  var getSheetVersion = (getOptions, callback) => {
    versionUrl = options.apiUrls.sheets + getOptions.sheetId + '/version';
    return listSheets(_.extend({}, optionsToSend, getOptions, {url: versionUrl}), callback);
  };

  var listOrganizationSheets = (getOptions, callback) => {
    var orgSheetsUrl = options.apiUrls.users + 'sheets';
    return requestor.get(_.extend({}, optionsToSend, getOptions, {url: orgSheetsUrl}), callback);
  };

  return {
    getSheet        : listSheets,
    listSheets      : listSheets,
    getSheetAsCSV   : getSheetAsCSV,
    getSheetAsExcel : getSheetAsExcel,
    getSheetAsPDF   : getSheetAsPDF,
    getSheetVersion : getSheetVersion,
    listOrganizationSheets : listOrganizationSheets
  };
};
