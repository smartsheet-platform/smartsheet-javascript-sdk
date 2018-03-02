var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = _.extend({}, options.clientOptions);


  var getComment = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var deleteComment = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var addCommentUrlAttachment = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/attachments'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var addCommentFileAttachment = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/attachments'};
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var editComment = (putOptions, callback) => {
    var urlOptions = {url: buildUrl(putOptions)};
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/comments/' + (urlOptions.commentId || '');

  return {
    getComment : getComment,
    deleteComment : deleteComment,
    addCommentUrlAttachment : addCommentUrlAttachment,
    addCommentAttachment: addCommentUrlAttachment,
    addCommentFileAttachment : addCommentFileAttachment,
    editComment : editComment
  };
};
