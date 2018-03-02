var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.groups,
  };
  _.extend(optionsToSend, options.clientOptions);


  var listGroups = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  var createGroup = (postOptions, callback) =>
    requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  var addGroupMembers = (postOptions, callback) => {
    var urlOptions = {url: options.apiUrls.groups + postOptions.groupId + '/members/'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var updateGroup = (putOptions, callback) =>
    requestor.put(_.extend({}, optionsToSend, putOptions), callback);

  var deleteGroup = (deleteOptions, callback) =>
    requestor.delete(_.extend({}, optionsToSend, deleteOptions), callback);

  var removeGroupMember = (deleteOptions, callback) => {
    var urlOptions = {url: options.apiUrls.groups + deleteOptions.groupId + '/members/' + deleteOptions.userId};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  return {
    listGroups        : listGroups,
    getGroup          : listGroups,
    createGroup       : createGroup,
    addGroupMembers   : addGroupMembers,
    updateGroup       : updateGroup,
    deleteGroup       : deleteGroup,
    removeGroupMember : removeGroupMember
  };
};
