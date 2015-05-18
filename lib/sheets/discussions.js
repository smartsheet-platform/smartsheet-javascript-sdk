var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken
  };

  var getDiscussions = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var listDiscussionAttachments = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions) + '/attachments';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var createDiscussion = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions);
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var addDiscussionComment = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + '/comments';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var deleteDiscussion = function(deleteOptions, callback) {
    optionsToSend.url = buildUrl(deleteOptions);
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.sheets + urlOptions.sheetId + '/discussions/' + (urlOptions.discussionId || '');
  };

  return {
    getDiscussions : getDiscussions,
    getDiscussion : getDiscussions,
    listDiscussionAttachments : listDiscussionAttachments,
    createDiscussion : createDiscussion,
    addDiscussionComment : addDiscussionComment,
    deleteDiscussion : deleteDiscussion
  };
};
