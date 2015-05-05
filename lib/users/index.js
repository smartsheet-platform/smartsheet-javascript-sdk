var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.users,
    accessToken : options.accessToken
  };

  var listAllUsers = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getCurrentUser = function(getOptions, callback) {
    optionsToSend.url = options.apiUrls.users + 'me';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var addUser = function(postOptions, callback) {
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var addUserAndSendEmail = function(postOptions, callback) {
    return addUser(_.extend(postOptions, {queryParameters:{sendEmail:true}}), callback);
  };

  var updateUser = function(putOptions, callback) {
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var removeUser = function(deleteOptions, callback) {
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  return {
    getUser                : listAllUsers,
    listAllUsers           : listAllUsers,
    getCurrentUser         : getCurrentUser,
    addUser                : addUser,
    addUserAndSendEmail    : addUserAndSendEmail,
    updateUser             : updateUser,
    removeUser             : removeUser
  };
};
