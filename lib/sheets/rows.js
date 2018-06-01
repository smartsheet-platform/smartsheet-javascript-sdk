var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = _.extend({}, options.clientOptions);


  var getRow = (getOptions, callback) => {
    var urlOptions = {url: buildUrlWithRowId(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var getRowAttachments = (getOptions, callback) => {
    var urlOptions = {url: buildUrlWithRowId(getOptions) + '/attachments'};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var getRowDiscussions = (getOptions, callback) => {
    var urlOptions = {url: buildUrlWithRowId(getOptions) + '/discussions'};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var getCellHistory = (getOptions, callback) => {
    var urlOptions = {url: buildUrlWithRowId(getOptions) + '/columns/' + getOptions.columnId + '/history'};
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
    var urlOptions = {url: buildUrlWithRowId(postOptions) + '/attachments'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var addRowFileAttachment = (postOptions, callback) => {
    var urlOptions = {url: buildUrlWithRowId(postOptions) + '/attachments'};
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var createRowDiscussion = (postOptions, callback) => {
    var urlOptions = {url: buildUrlWithRowId(postOptions) + '/discussions'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var sendRows = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/emails'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var updateRow = (putOptions, callback) => {
    var urlOptions = {url: buildUrl(putOptions)};
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var deleteRow = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions) + '?ids=' + (deleteOptions.rowId || '')};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var deleteRows = (deleteOptions, callback) => {
    var options = JSON.parse(JSON.stringify(deleteOptions));
    var params = options.queryParameters;
    if (_.isArray(params.ids)) {
      params.ids = params.ids.join(',');
    }

    var urlOptions = {url: buildUrl(options)};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, options), callback);
  };

  var addImageToCell = (postOptions, callback) => {
    var urlOptions = {url: buildUrlWithRowId(postOptions) + '/columns/' + postOptions.columnId + '/cellimages'};
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var buildUrlWithRowId = urlOptions =>
    buildUrl(urlOptions) + '/' + urlOptions.rowId;

  var buildUrl = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/rows';

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
