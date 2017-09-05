var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;
  var shares = require('../share/share.js')(options.apiUrls.workspaces);

  var optionsToSend = {
    url: options.apiUrls.workspaces,
    accessToken : options.accessToken
  };

  var listWorkspaces = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var listWorkspaceFolders = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions) + '/folders';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var createWorkspace = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions);
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var createFolder = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/folders';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var updateWorkspace = (putOptions, callback) => {
    optionsToSend.url = buildUrl(putOptions);
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var deleteWorkspace = (deleteOptions, callback) => {
    optionsToSend.url = buildUrl(deleteOptions);
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var copyWorkspace = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/copy';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var buildUrl = urlOptions => {
    var id ='';
    if(urlOptions && urlOptions.workspaceId){
      id = urlOptions.workspaceId;
    }
    return options.apiUrls.workspaces + id;
  };

  return function() {
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
  }();
};
