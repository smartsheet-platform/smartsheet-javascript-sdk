var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken
  };

  var getRow = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getRowAttachments = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions) + '/attachments';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getRowDiscussions = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions) + '/discussions';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getCellHistory = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions) + '/columns/' + getOptions.columnId + '/history';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var copyRowToAnotherSheet = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + 'copy';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var moveRowToAnotherSheet = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + 'move';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var addRow = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions);
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var addRowAttachment = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + '/attachments';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var createRowDiscussion = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + '/discussions';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var sendRow = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + '/emails';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var updateRow = function(putOptions, callback) {
    optionsToSend.url = buildUrl(putOptions);
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var deleteRow = function(deleteOptions, callback) {
    optionsToSend.url = options.apiUrls.sheets + deleteOptions.sheetId + '/rows?ids=' + (deleteOptions.rowId || '');
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.sheets + urlOptions.sheetId + '/rows/' + (urlOptions.rowId || '');
  };

  return {
    getRow : getRow,
    getRowAttachments : getRowAttachments,
    getRowDiscussions : getRowDiscussions,
    getCellHistory : getCellHistory,
    copyRowToAnotherSheet : copyRowToAnotherSheet,
    moveRowToAnotherSheet : moveRowToAnotherSheet,
    addRow : addRow,
    addRows   : addRow,
    addRowAttachment : addRowAttachment,
    createRowDiscussion : createRowDiscussion,
    sendRow : sendRow,
    deleteRow : deleteRow,
    updateRow : updateRow
  };
};
