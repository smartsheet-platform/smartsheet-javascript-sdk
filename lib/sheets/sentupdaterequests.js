var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = _.extend({}, options.clientOptions);


  var deleteSentUpdateRequest = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var getSentUpdateRequest = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var getAllSentUpdateRequests = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/sentupdaterequests/' + (urlOptions.sentUpdateRequestId || '');

  return {
    deleteSentUpdateRequest : deleteSentUpdateRequest,
    getSentUpdateRequest: getSentUpdateRequest,
    getAllSentUpdateRequests: getAllSentUpdateRequests
  };
};
