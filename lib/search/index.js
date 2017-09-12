var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.search,
    urls : options.apiUrls,
    accessToken : options.accessToken
  };

  var searchAll = (getOptions, callback) => {
    var queryParameters = {query: getOptions.query};
    return requestor.get(_.extend({queryParameters: queryParameters}, optionsToSend, getOptions), callback);
  };

  var searchSheet = (getOptions, callback) => {
    var urlOptions = {url: options.apiUrls.search + 'sheets/' + getOptions.sheetId};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  return {
    searchAll : searchAll,
    searchSheet : searchSheet
  };
};
