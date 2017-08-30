var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken
  };

  var getComment = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var deleteComment = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions);
    return utils.delete(_.extend(optionsToSend, getOptions), callback);
  };

  var addCommentUrlAttachment = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions) + '/attachments';
    return utils.post(_.extend(optionsToSend, getOptions), callback);
  };
  
  var addCommentFileAttachment = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions) + '/attachments';
    return utils.postFile(_.extend(optionsToSend, getOptions), callback);
  };

  var editComment = function(putOptions, callback) {
    optionsToSend.url = buildUrl(putOptions);
    return utils.put(_.extend(optionsToSend, putOptions), callback);
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
