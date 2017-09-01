var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var listAttachments = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var listAttachmentVersions = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions) + '/versions';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var addUrlAttachment = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions);
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };
  
  var addFileAttachment = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions);
    return utils.postFile(_.extend(optionsToSend, postOptions), callback);
  };

  var attachNewVersion = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + '/versions';
    return utils.postFile(_.extend(optionsToSend, postOptions), callback);
  };

  var deleteAttachment = function(deleteOptions, callback) {
    optionsToSend.url = buildUrl(deleteOptions);
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var deleteAllAttachmentVersions = function(deleteOptions, callback) {
    optionsToSend.url = buildUrl(deleteOptions) + '/versions';
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.sheets + urlOptions.sheetId + '/attachments/' + (urlOptions.attachmentId || '');
  };

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
