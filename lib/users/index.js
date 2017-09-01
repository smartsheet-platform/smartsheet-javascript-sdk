var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');
var alternateEmails = require('./alternateemails.js');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.users,
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var listAllUsers = function(getOptions, callback) {
    return utils.get(_.extend({}, optionsToSend, getOptions), callback);
  };

  var getCurrentUser = function(getOptions, callback) {
    var urlOptions = {url: options.apiUrls.users + 'me'};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var addUser = function(postOptions, callback) {
    return utils.post(_.extend({}, optionsToSend, postOptions), callback);
  };

  var addUserAndSendEmail = function(postOptions, callback) {
    return addUser(_.extend({}, postOptions, {queryParameters:{sendEmail:true}}), callback);
  };

  var updateUser = function(putOptions, callback) {
    return utils.put(_.extend({}, optionsToSend, putOptions), callback);
  };

  var removeUser = function(deleteOptions, callback) {
    return utils.delete(_.extend({}, optionsToSend, deleteOptions), callback);
  };

  var buildUserObject = function () {
    var userObject = {
      getUser                : listAllUsers,
      listAllUsers           : listAllUsers,
      getCurrentUser         : getCurrentUser,
      addUser                : addUser,
      addUserAndSendEmail    : addUserAndSendEmail,
      updateUser             : updateUser,
      removeUser             : removeUser
    };

    userObject = _.extend(userObject, alternateEmails.create(options));

    return userObject;
  };

  return buildUserObject();
};
