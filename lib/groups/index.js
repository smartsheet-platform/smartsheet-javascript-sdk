var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.groups,
    accessToken : options.accessToken
  };

  var listGroups = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var createGroup = function(postOptions, callback) {
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var addGroupMembers = function(postOptions, callback) {
    optionsToSend.url = options.apiUrls.groups + postOptions.groupId + '/members/';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var updateGroup = function(putOptions, callback) {
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var deleteGroup = function(deleteOptions, callback) {
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var removeGroupMember = function(deleteOptions, callback) {
    optionsToSend.url = options.apiUrls.groups + deleteOptions.groupId + '/members/' + deleteOptions.userId;
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
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
