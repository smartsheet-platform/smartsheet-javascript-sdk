var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.users,
    accessToken : options.accessToken
  };

  var getUsers = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getCurrentUser = function(getOptions, callback) {
    optionsToSend.url = options.apiUrls.users + 'me';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getAllUsersSheets = function(getOptions, callback) {
    optionsToSend.url = options.apiUrls.users + 'sheets';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var createUser = function(postOptions, callback) {
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var createUserAndSendEmail = function(postOptions, callback) {
    return createUser(_.extend(postOptions, {queryParameters:{sendEmail:true}}), callback);
  };

  var updateUser = function(putOptions, callback) {
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var deleteUser = function(deleteOptions, callback) {
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  return {
    getUser                : getUsers,
    getUsers               : getUsers,
    getCurrentUser         : getCurrentUser,
    getAllUsersSheets      : getAllUsersSheets,
    createUser             : createUser,
    createUserAndSendEmail : createUserAndSendEmail,
    updateUser             : updateUser,
    deleteUser             : deleteUser
  };
};
