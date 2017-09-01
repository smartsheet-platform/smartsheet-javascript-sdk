var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.folders,
    urls : options.apiUrls,
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var getFolder = function(getOptions, callback) {
    return utils.get(_.extend({}, optionsToSend, getOptions), callback);
  };

  var listChildFolders = function(getOptions, callback) {
    getOptions.url = options.apiUrls.folders + getOptions.folderId + '/folders';
    return utils.get(_.extend({}, optionsToSend, getOptions), callback);
  };

  var createChildFolder = function(postOptions, callback) {
    postOptions.url = options.apiUrls.folders + postOptions.folderId + '/folders';
    return utils.post(_.extend({}, optionsToSend, postOptions), callback);
  };

  var updateFolder = function(putOptions, callback) {
    return utils.put(_.extend({}, optionsToSend, putOptions), callback);
  };

  var deleteFolder = function(deleteOptions, callback) {
    return utils.delete(_.extend({}, optionsToSend, deleteOptions), callback);
  };

  var copyFolder = function(postOptions, callback) {
    postOptions.url = options.apiUrls.folders + postOptions.folderId + '/copy';
    return utils.post(_.extend({}, optionsToSend, postOptions), callback);
  };

  var moveFolder = function(postOptions, callback) {
    postOptions.url = options.apiUrls.folders + postOptions.folderId + '/move';
    return utils.post(_.extend({}, optionsToSend, postOptions), callback);
  };

  return {
    getFolder  : getFolder,
    listChildFolders : listChildFolders,
    createChildFolder : createChildFolder,
    updateFolder : updateFolder,
    deleteFolder : deleteFolder,
    moveFolder : moveFolder,
    copyFolder : copyFolder
  };
};
