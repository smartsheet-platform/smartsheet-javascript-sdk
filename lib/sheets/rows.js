var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    accessToken : options.accessToken
  };

  var getRow = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var getRowAttachments = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions) + '/attachments'};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var getRowDiscussions = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions) + '/discussions'};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var getCellHistory = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions) + '/columns/' + getOptions.columnId + '/history'};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var copyRowToAnotherSheet = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/copy'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var moveRowToAnotherSheet = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/move'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var addRow = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions)};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var addRowUrlAttachment = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/attachments'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };
  
  var addRowFileAttachment = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/attachments'};
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var createRowDiscussion = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/discussions'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var sendRows = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + 'emails'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var updateRow = (putOptions, callback) => {
    var urlOptions = {url: buildUrl(putOptions)};
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var deleteRow = (deleteOptions, callback) => {
    var urlOptions = {url: options.apiUrls.sheets + deleteOptions.sheetId + '/rows?ids=' + (deleteOptions.rowId || '')};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var deleteRows = (deleteOptions, callback) => {
    deleteOptions.queryParameters = deleteOptions.queryParameters || {};
    deleteOptions.queryParameters.ids = deleteOptions.rowIds.join(',');
    
    var urlOptions = {url: options.apiUrls.sheets + deleteOptions.sheetId + '/rows'};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var addImageToCell = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/columns/' + postOptions.columnId + '/cellimages'};
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/rows/' + (urlOptions.rowId || '');

  return {
    getRow : getRow,
    getRowAttachments : getRowAttachments,
    getRowDiscussions : getRowDiscussions,
    getCellHistory : getCellHistory,
    copyRowToAnotherSheet : copyRowToAnotherSheet,
    moveRowToAnotherSheet : moveRowToAnotherSheet,
    addRow : addRow,
    addRows   : addRow,
    addRowUrlAttachment : addRowUrlAttachment,
    addRowAttachment: addRowUrlAttachment,
    addRowFileAttachment : addRowFileAttachment,
    createRowDiscussion : createRowDiscussion,
    sendRows : sendRows,
    deleteRow : deleteRow,
    deleteRows : deleteRows,
    updateRow : updateRow,
    addImageToCell : addImageToCell
  };
};
