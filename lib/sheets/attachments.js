var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    accessToken : options.accessToken
  };

  var listAttachments = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listAttachmentVersions = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions) + '/versions'};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var addUrlAttachment = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions)};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };
  
  var addFileAttachment = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions)};
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var attachNewVersion = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/versions'};
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var deleteAttachment = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var deleteAllAttachmentVersions = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions) + '/versions'};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/attachments/' + (urlOptions.attachmentId || '');

  return {
    getAttachment : listAttachments,
    listAttachments : listAttachments,
    listAttachmentVersions : listAttachmentVersions,
    addAttachment: addUrlAttachment,
    addUrlAttachment : addUrlAttachment,
    addFileAttachment : addFileAttachment,
    attachNewVersion : attachNewVersion,
    deleteAttachment : deleteAttachment,
    deleteAllAttachmentVersions : deleteAllAttachmentVersions
  };
};
