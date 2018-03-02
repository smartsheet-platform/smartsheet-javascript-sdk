var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.folders,
    urls : options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);


  var getFolder = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  var listChildFolders = (getOptions, callback) => {
    var urlOptions = {url: options.apiUrls.folders + getOptions.folderId + '/folders'};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var createChildFolder = (postOptions, callback) => {
    var urlOptions = {url: options.apiUrls.folders + postOptions.folderId + '/folders'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var updateFolder = (putOptions, callback) =>
    requestor.put(_.extend({}, optionsToSend, putOptions), callback);

  var deleteFolder = (deleteOptions, callback) =>
    requestor.delete(_.extend({}, optionsToSend, deleteOptions), callback);

  var copyFolder = (postOptions, callback) => {
    var urlOptions = {url: options.apiUrls.folders + postOptions.folderId + '/copy'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var moveFolder = (postOptions, callback) => {
    var urlOptions = {url: options.apiUrls.folders + postOptions.folderId + '/move'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
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
