var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;
  
  var optionsToSend = {
    accessToken : options.accessToken
  };

  var deleteSentUpdateRequest = (deleteOptions, callback) => {
    optionsToSend.url = buildUrl(deleteOptions);
    return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var getSentUpdateRequest = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getAllSentUpdateRequests = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/sentupdaterequests/' + (urlOptions.sentUpdateRequestId || '');

  return {
    deleteSentUpdateRequest : deleteSentUpdateRequest,
    getSentUpdateRequest: getSentUpdateRequest,
    getAllSentUpdateRequests: getAllSentUpdateRequests
  };
};
