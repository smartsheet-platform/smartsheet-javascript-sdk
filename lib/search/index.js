var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.search,
    urls : options.apiUrls,
    accessToken : options.accessToken
  };

  var searchAll = function(getOptions, callback) {
    optionsToSend.queryParameters = getOptions;
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var searchSheet = function(getOptions, callback) {
    optionsToSend.url = options.apiUrls.search + 'sheets/' + getOptions.sheetId;
    optionsToSend.queryParameters = getOptions.queryParameters;
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  return {
    searchAll : searchAll,
    searchSheet : searchSheet
  };
};
