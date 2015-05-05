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

  var addCommentAttachment = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions) + '/attachments';
    return utils.post(_.extend(optionsToSend, getOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.sheets + urlOptions.sheetId + '/comments/' + (urlOptions.commentId || '');
  };

  return {
    getComment : getComment,
    deleteComment : deleteComment,
    addCommentAttachment : addCommentAttachment
  };
};
