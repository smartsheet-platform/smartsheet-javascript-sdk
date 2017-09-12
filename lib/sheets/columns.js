var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    accessToken : options.accessToken
  };

  var getColumns = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var addColumn = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions)};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var updateColumn = (putOptions, callback) => {
    var urlOptions = {url: buildUrl(putOptions)};
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var deleteColumn = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
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
