var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.sheets,
    accessToken : options.accessToken
  };

  var getSheet = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getSheetAsCsv = function(getOptions, callback) {
    return getSheet(_.extend(getOptions, {accept:constants.acceptHeaders.textCsv}), callback)
  };

  var getSheetAsPdf = function(getOptions, callback) {
    return getSheet(_.extend(getOptions, {accept:constants.acceptHeaders.applicationPdf}), callback)
  };

  var getSheetAsExcel = function(getOptions, callback) {
    return getSheet(_.extend(getOptions, {accept:constants.acceptHeaders.vndMsExcel}), callback)
  };


  return {
    getSheets       : getSheet,
    getSheet        : getSheet,
    getSheetAsCsv   : getSheetAsCsv,
    getSheetAsExcel : getSheetAsExcel,
    getSheetAsPdf   : getSheetAsPdf
  };
};
