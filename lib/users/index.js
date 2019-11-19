var _ = require('underscore');
var alternateEmails = require('./alternateemails.js');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.users
  };
  _.extend(optionsToSend, options.clientOptions);


  var listAllUsers = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  var getCurrentUser = (getOptions, callback) => {
    var urlOptions = {url: options.apiUrls.users + 'me'};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var addUser = (postOptions, callback) =>
    requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  var addUserAndSendEmail = (postOptions, callback) =>
    addUser(_.extend({}, postOptions, {queryParameters:{sendEmail:true}}), callback);

  var updateUser = (putOptions, callback) =>
    requestor.put(_.extend({}, optionsToSend, putOptions), callback);

  var removeUser = (deleteOptions, callback) =>
    requestor.delete(_.extend({}, optionsToSend, deleteOptions), callback);

  var addProfileImage = (postOptions, callback) => {
    var urlOptions = {url: buildProfileImageUrl(postOptions)};
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var buildProfileImageUrl = urlOptions =>
    options.apiUrls.users + urlOptions.userId + '/profileimage'

  var userObject = {
    getUser                : listAllUsers,
    listAllUsers           : listAllUsers,
    getCurrentUser         : getCurrentUser,
    addUser                : addUser,
    addUserAndSendEmail    : addUserAndSendEmail,
    updateUser             : updateUser,
    removeUser             : removeUser,
    addProfileImage        : addProfileImage,
  };

  _.extend(userObject, alternateEmails.create(options));

  return userObject;
};
