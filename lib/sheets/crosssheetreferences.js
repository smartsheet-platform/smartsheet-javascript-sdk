var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    accessToken : options.accessToken,
    userAgent: options.userAgent
  };

  var createCrossSheetReference = (postOptions, callback) => {
    var urlOptions = {url: buildUrlBase(postOptions)};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var getCrossSheetReference = (getOptions, callback) => {
    var urlOptions = {url: buildUrlBase(getOptions) + getOptions.crossSheetReferenceId};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listCrossSheetReferences = (getOptions, callback) => {
    var urlOptions = {url: buildUrlBase(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var buildUrlBase = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/crosssheetreferences/';

  return {
    createCrossSheetReference : createCrossSheetReference,
    getCrossSheetReference : getCrossSheetReference,
    listCrossSheetReferences : listCrossSheetReferences
  };
};
