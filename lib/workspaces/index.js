var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var shares = require('../share/share.js')(options.apiUrls.workspaces);

  var optionsToSend = {
    url: options.apiUrls.workspaces,
    accessToken : options.accessToken
  };

  var listWorkspaces = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var listWorkspaceFolders = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions) + '/folders';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var createWorkspace = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions);
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var createFolder = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + '/folders';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var updateWorkspace = function(putOptions, callback) {
    optionsToSend.url = buildUrl(putOptions);
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var deleteWorkspace = function(deleteOptions, callback) {
    optionsToSend.url = buildUrl(deleteOptions);
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
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
      updateWorkspace : updateWorkspace
    };

    workspaceObject = _.extend(workspaceObject, shares.create(options));
    return workspaceObject;
  };

  return buildWorkspaceObject();
};
