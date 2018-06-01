var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.search,
    urls : options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);


  var searchAll = (getOptions, callback) => {
    var options = JSON.parse(JSON.stringify(getOptions));
    options.queryParameters = options.queryParameters || {};
    options.queryParameters = _.extend({query: options.query}, options.queryParameters);

    return requestor.get(_.extend({}, optionsToSend, options), callback);
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
