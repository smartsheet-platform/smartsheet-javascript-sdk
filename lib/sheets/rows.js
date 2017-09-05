var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    accessToken : options.accessToken
  };

  var getRow = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getRowAttachments = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions) + '/attachments';
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getRowDiscussions = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions) + '/discussions';
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getCellHistory = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions) + '/columns/' + getOptions.columnId + '/history';
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var copyRowToAnotherSheet = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + 'copy';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var moveRowToAnotherSheet = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + 'move';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var addRow = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions);
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var addRowUrlAttachment = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/attachments';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };
  
  var addRowFileAttachment = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/attachments';
    return requestor.postFile(_.extend(optionsToSend, postOptions), callback);
  };

  var createRowDiscussion = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/discussions';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var sendRow = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/emails';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var updateRow = (putOptions, callback) => {
    optionsToSend.url = buildUrl(putOptions);
    return requestor.put(_.extend(optionsToSend, putOptions), callback);
  };

  var deleteRow = (deleteOptions, callback) => {
    optionsToSend.url = options.apiUrls.sheets + deleteOptions.sheetId + '/rows?ids=' + (deleteOptions.rowId || '');
    return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var addImageToCell = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/columns/' + postOptions.columnId + '/cellimages';
    return requestor.postFile(_.extend(optionsToSend, postOptions), callback);
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
    addRowFileAttachment : addRowFileAttachment,
    createRowDiscussion : createRowDiscussion,
    sendRow : sendRow,
    deleteRow : deleteRow,
    updateRow : updateRow,
    addImageToCell : addImageToCell
  };
};
