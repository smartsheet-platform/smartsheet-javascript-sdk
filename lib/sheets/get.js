var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var headers = require('../utils/constants.js').acceptHeaders;

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.sheets,
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var listSheets = function(getOptions, callback) {
    return utils.get(_.extend({}, optionsToSend, getOptions), callback);
  };

  var getSheetAsCSV = function(getOptions, callback) {
    return listSheets(_.extend(getOptions, {accept:headers.textCsv}), callback);
  };

  var getSheetAsPDF = function(getOptions, callback) {
    return listSheets(_.extend(getOptions, {accept:headers.applicationPdf}), callback);
  };

  var getSheetAsExcel = function(getOptions, callback) {
    return listSheets(_.extend(getOptions, {accept:headers.vndMsExcel}), callback);
  };

  var getSheetVersion = function(getOptions, callback) {
    getOptions.url = options.apiUrls.sheets + getOptions.sheetId + '/version';
    return listSheets(_.extend({}, optionsToSend, getOptions), callback);
  };

  var listOrganizationSheets = function(getOptions, callback) {
    getOptions = getOptions || {};
    getOptions.url = options.apiUrls.users + 'sheets';
    return utils.get(_.extend({}, optionsToSend, getOptions), callback);
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
