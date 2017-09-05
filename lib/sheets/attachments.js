var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    accessToken : options.accessToken
  };

  var listAttachments = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var listAttachmentVersions = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions) + '/versions';
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var addUrlAttachment = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions);
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };
  
  var addFileAttachment = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions);
    return requestor.postFile(_.extend(optionsToSend, postOptions), callback);
  };

  var attachNewVersion = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/versions';
    return requestor.postFile(_.extend(optionsToSend, postOptions), callback);
  };

  var deleteAttachment = (deleteOptions, callback) => {
    optionsToSend.url = buildUrl(deleteOptions);
    return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var deleteAllAttachmentVersions = (deleteOptions, callback) => {
    optionsToSend.url = buildUrl(deleteOptions) + '/versions';
    return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/attachments/' + (urlOptions.attachmentId || '');

  return {
    getAttachment : listAttachments,
    listAttachments : listAttachments,
    listAttachmentVersions : listAttachmentVersions,
    addUrlAttachment : addUrlAttachment,
    addFileAttachment : addFileAttachment,
    attachNewVersion : attachNewVersion,
    deleteAttachment : deleteAttachment,
    deleteAllAttachmentVersions : deleteAllAttachmentVersions

  };
};
