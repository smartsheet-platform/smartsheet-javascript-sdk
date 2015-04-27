var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken
  };

  var getAttachments = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getAttachmentVersion = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions) + '/versions';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var uploadAttachment = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions);
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var uploadNewAttachmentVersion = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + '/versions';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var deleteAttachment = function(deleteOptions, callback) {
    optionsToSend.url = buildUrl(deleteOptions);
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var deleteAttachmentVersion = function(deleteOptions, callback) {
    optionsToSend.url = buildUrl(deleteOptions) + '/versions';
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.sheets + urlOptions.sheetId + '/attachments/' + (urlOptions.attachmentId || '');
  };

  return {
    getAttachment : getAttachments,
    getAttachments : getAttachments,
    getAttachmentVersion : getAttachmentVersion,
    uploadAttachment : uploadAttachment,
    uploadNewAttachmentVersion : uploadNewAttachmentVersion,
    deleteAttachment : deleteAttachment,
    deleteAttachmentVersion : deleteAttachmentVersion

  };
};
