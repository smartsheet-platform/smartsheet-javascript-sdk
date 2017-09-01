var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var getRow = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions)};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var getRowAttachments = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions) + '/attachments'};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var getRowDiscussions = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions) + '/discussions'};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var getCellHistory = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions) + '/columns/' + getOptions.columnId + '/history'};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var copyRowToAnotherSheet = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/copy'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var moveRowToAnotherSheet = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/move'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var addRow = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions)};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var addRowUrlAttachment = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/attachments'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };
  
  var addRowFileAttachment = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/attachments'};
    return utils.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var createRowDiscussion = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/discussions'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var sendRow = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/emails'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var updateRow = function(putOptions, callback) {
    var urlOptions = {url: buildUrl(putOptions)};
    return utils.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var deleteRow = function(deleteOptions, callback) {
    var urlOptions = {url: options.apiUrls.sheets + deleteOptions.sheetId + '/rows?ids=' + (deleteOptions.rowId || '')};
    return utils.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var addImageToCell = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/columns/' + postOptions.columnId + '/cellimages'};
    return utils.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
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
    addRowUrlAttachment : addRowUrlAttachment,
    addRowFileAttachment : addRowFileAttachment,
    createRowDiscussion : createRowDiscussion,
    sendRow : sendRow,
    deleteRow : deleteRow,
    updateRow : updateRow,
    addImageToCell : addImageToCell
  };
};
