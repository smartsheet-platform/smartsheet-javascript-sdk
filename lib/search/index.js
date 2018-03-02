var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.search,
    urls : options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);


  var searchAll = (getOptions, callback) => {
    getOptions.queryParameters = getOptions.queryParameters || {};
    getOptions.queryParameters = _.extend({query: getOptions.query}, getOptions.queryParameters);

    return requestor.get(_.extend({}, optionsToSend, getOptions), callback);
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
