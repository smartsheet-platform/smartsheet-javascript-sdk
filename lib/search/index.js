var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.search,
    urls : options.apiUrls,
    accessToken : options.accessToken
  };

  var searchAll = (getOptions, callback) => {
    optionsToSend.queryParameters = getOptions;
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var searchSheet = (getOptions, callback) => {
    optionsToSend.url = options.apiUrls.search + 'sheets/' + getOptions.sheetId;
    optionsToSend.queryParameters = getOptions.queryParameters;
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  return {
    searchAll : searchAll,
    searchSheet : searchSheet
  };
};
