var _ = require('underscore');
var headers = require('../utils/constants.js').acceptHeaders;

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.sheets
  };
  _.extend(optionsToSend, options.clientOptions);

  var getSheet = (getOptions, callback) => {
    var urlOptions = {url: options.apiUrls.sheets + getOptions.sheetId};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  }

  var listSheets = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  var getSheetAsCSV = (getOptions, callback) =>
    listSheets(_.extend({}, getOptions, {accept:headers.textCsv}), callback);

  var getSheetAsPDF = (getOptions, callback) =>
    listSheets(_.extend({}, getOptions, {accept:headers.applicationPdf, encoding:null}), callback);

  var getSheetAsExcel = (getOptions, callback) =>
    listSheets(_.extend({}, getOptions, {accept:headers.vndMsExcel, encoding:null}), callback);

  var getSheetVersion = (getOptions, callback) => {
    var urlOptions = {url: options.apiUrls.sheets + getOptions.sheetId + '/version'};
    return listSheets(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listOrganizationSheets = (getOptions, callback) => {
    var urlOptions = {url: options.apiUrls.users + 'sheets'};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  return {
    getSheet        : getSheet,
    listSheets      : listSheets,
    getSheetAsCSV   : getSheetAsCSV,
    getSheetAsExcel : getSheetAsExcel,
    getSheetAsPDF   : getSheetAsPDF,
    getSheetVersion : getSheetVersion,
    listOrganizationSheets : listOrganizationSheets
  };
};
