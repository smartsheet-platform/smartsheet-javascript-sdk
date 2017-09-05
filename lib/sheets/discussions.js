var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;  

  var optionsToSend = {
    accessToken : options.accessToken
  };

  var getDiscussions = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var listDiscussionAttachments = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions) + '/attachments';
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var createDiscussion = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions);
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var addDiscussionComment = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/comments';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var deleteDiscussion = (deleteOptions, callback) => {
    optionsToSend.url = buildUrl(deleteOptions);
    return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
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
