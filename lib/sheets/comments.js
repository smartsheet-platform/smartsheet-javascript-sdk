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
    optionsToSend.url = buildUrl(getOptions);
    return utils.get(_.extend({}, optionsToSend, getOptions), callback);
  };

  var deleteComment = function(deleteOptions, callback) {
    optionsToSend.url = buildUrl(deleteOptions);
    return utils.delete(_.extend({}, optionsToSend, deleteOptions), callback);
  };

  var addCommentUrlAttachment = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + '/attachments';
    return utils.post(_.extend({}, optionsToSend, postOptions), callback);
  };
  
  var addCommentFileAttachment = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + '/attachments';
    return utils.postFile(_.extend({}, optionsToSend, postOptions), callback);
  };

  var editComment = function(putOptions, callback) {
    optionsToSend.url = buildUrl(putOptions);
    return utils.put(_.extend({}, optionsToSend, putOptions), callback);
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
