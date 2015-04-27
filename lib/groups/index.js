var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.groups,
    accessToken : options.accessToken
  };

  var getGroup = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var createGroup = function(postOptions, callback) {
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var createGroupMember = function(deleteOptions, callback) {
    optionsToSend.url = options.apiUrls.groups + getOptions.groupId + '/members' + getOptions.memberId;
    return utils.post(_.extend(optionsToSend, deleteOptions), callback);
  };

  var updateGroup = function(putOptions, callback) {
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var deleteGroup = function(deleteOptions, callback) {
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var deleteGroupMember = function(deleteOptions, callback) {
    optionsToSend.url = options.apiUrls.groups + getOptions.groupId + '/members' + getOptions.memberId;
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  return {
    getGroups         : getGroup,
    getGroup          : getGroup,
    createGroup       : createGroupMember,
    createGroupMember : createGroup,
    updateGroup       : updateGroup,
    deleteGroup       : deleteGroup,
    deleteGroupMember : deleteGroupMember
  };
};
