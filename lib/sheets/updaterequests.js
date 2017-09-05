var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;
  
  var optionsToSend = {
    accessToken : options.accessToken
  };

  var createUpdateRequest = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions);
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var deleteUpdateRequest = (deleteOptions, callback) => {
    optionsToSend.url = buildUrl(deleteOptions);
    return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var getUpdateRequest = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getAllUpdateRequests = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var changeUpdateRequest = (putOptions, callback) => {
    optionsToSend.url = buildUrl(putOptions);
    return requestor.put(_.extend(optionsToSend, putOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/updaterequests/' + (urlOptions.updateRequestId || '');

  return {
    createUpdateRequest : createUpdateRequest,
    deleteUpdateRequest : deleteUpdateRequest,
    getUpdateRequest : getUpdateRequest,
    getAllUpdateRequests : getAllUpdateRequests,
    changeUpdateRequest : changeUpdateRequest
  };
};
