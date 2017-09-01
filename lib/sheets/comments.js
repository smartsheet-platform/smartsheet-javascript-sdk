var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var getComment = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions)};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var deleteComment = function(deleteOptions, callback) {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return utils.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var addCommentUrlAttachment = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/attachments'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };
  
  var addCommentFileAttachment = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/attachments'};
    return utils.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var editComment = function(putOptions, callback) {
    var urlOptions = {url: buildUrl(putOptions)};
    return utils.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.sheets + urlOptions.sheetId + '/comments/' + (urlOptions.commentId || '');
  };

  return {
    getComment : getComment,
    deleteComment : deleteComment,
    addCommentUrlAttachment : addCommentUrlAttachment,
    addCommentFileAttachment : addCommentFileAttachment,
    editComment : editComment
  };
};
