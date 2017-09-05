var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken
  };

  var getComment = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var deleteComment = (deleteOptions, callback) => {
    optionsToSend.url = buildUrl(deleteOptions);
    return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var addCommentUrlAttachment = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/attachments';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };
  
  var addCommentFileAttachment = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/attachments';
    return requestor.postFile(_.extend(optionsToSend, postOptions), callback);
  };

  var editComment = (putOptions, callback) => {
    optionsToSend.url = buildUrl(putOptions);
    return requestor.put(_.extend(optionsToSend, putOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/comments/' + (urlOptions.commentId || '');

  return {
    getComment : getComment,
    deleteComment : deleteComment,
    addCommentUrlAttachment : addCommentUrlAttachment,
    addCommentFileAttachment : addCommentFileAttachment,
    editComment : editComment
  };
};
