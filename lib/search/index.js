var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.search,
    urls : options.apiUrls,
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var searchAll = function(getOptions, callback) {
    var queryParameters = {query: getOptions.query};
    return utils.get(_.extend({queryParameters: queryParameters}, optionsToSend, getOptions), callback);
  };

  var searchSheet = function(getOptions, callback) {
    var urlOptions = {url: options.apiUrls.search + 'sheets/' + getOptions.sheetId};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  return {
    searchAll : searchAll,
    searchSheet : searchSheet
  };
};
