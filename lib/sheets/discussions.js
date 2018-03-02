var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = _.extend({}, options.clientOptions);


  var getDiscussions = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listDiscussionAttachments = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions) + '/attachments'};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var createDiscussion = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions)};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var addDiscussionComment = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/comments'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var deleteDiscussion = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var buildUrl = (urlOptions) =>
    options.apiUrls.sheets + urlOptions.sheetId + '/discussions/' + (urlOptions.discussionId || '');

  return {
    getDiscussions : getDiscussions,
    getDiscussion : getDiscussions,
    listDiscussionAttachments : listDiscussionAttachments,
    createDiscussion : createDiscussion,
    addDiscussionComment : addDiscussionComment,
    deleteDiscussion : deleteDiscussion
  };
};
