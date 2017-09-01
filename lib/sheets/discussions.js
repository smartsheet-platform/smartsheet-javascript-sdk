var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var getDiscussions = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions)};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listDiscussionAttachments = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions) + '/attachments'};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var createDiscussion = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions)};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var addDiscussionComment = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/comments'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var deleteDiscussion = function(deleteOptions, callback) {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return utils.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
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
