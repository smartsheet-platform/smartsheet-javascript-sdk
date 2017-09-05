var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    accessToken : options.accessToken
  };

  var getColumns = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var addColumn = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions);
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var updateColumn = (putOptions, callback) => {
    optionsToSend.url = buildUrl(putOptions);
    return requestor.put(_.extend(optionsToSend, putOptions), callback);
  };

  var deleteColumn = (deleteOptions, callback) => {
    optionsToSend.url = buildUrl(deleteOptions);
    return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/columns/' + (urlOptions.columnId || '');

  return {
    getColumns : getColumns,
    getColumn : getColumns,
    addColumn : addColumn,
    deleteColumn : deleteColumn,
    updateColumn : updateColumn
  };
};
