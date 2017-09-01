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
    var urlOptions = {url: buildUrl(getOptions)};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listAttachmentVersions = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions) + '/versions'};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var addUrlAttachment = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions)};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };
  
  var addFileAttachment = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions)};
    return utils.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var attachNewVersion = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/versions'};
    return utils.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var deleteAttachment = function(deleteOptions, callback) {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return utils.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var deleteAllAttachmentVersions = function(deleteOptions, callback) {
    var urlOptions = {url: buildUrl(deleteOptions) + '/versions'};
    return utils.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
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
