var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var shares = require('../share/share.js')(options.apiUrls.workspaces);

  var optionsToSend = {
    url: options.apiUrls.workspaces,
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var listWorkspaces = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions)};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listWorkspaceFolders = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions) + '/folders'};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var createWorkspace = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions)};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var createFolder = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/folders'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var updateWorkspace = function(putOptions, callback) {
    var urlOptions = {url: buildUrl(putOptions)};
    return utils.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var deleteWorkspace = function(deleteOptions, callback) {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return utils.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var copyWorkspace = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions) + '/copy'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    var id ='';
    if(urlOptions && urlOptions.workspaceId){
      id = urlOptions.workspaceId;
    }
    return options.apiUrls.workspaces + id;
  };

  var buildWorkspaceObject = function() {
    var workspaceObject = {
      listWorkspaces : listWorkspaces,
      getWorkspace : listWorkspaces,
      listWorkspaceFolders : listWorkspaceFolders,
      createWorkspace : createWorkspace,
      createFolder : createFolder,
      deleteWorkspace : deleteWorkspace,
      updateWorkspace : updateWorkspace,
      copyWorkspace : copyWorkspace
    };

    workspaceObject = _.extend(workspaceObject, shares.create(options));
    return workspaceObject;
  };

  return buildWorkspaceObject();
};
