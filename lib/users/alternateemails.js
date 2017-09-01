var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var addAlternateEmail = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions.userId);
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var getAlternateEmail = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions.userId, getOptions.alternateEmailId);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var listAlternateEmails = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions.userId);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var makeAlternateEmailPrimary = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions.userId, postOptions.alternateEmailId) + '/makeprimary';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var deleteAlternateEmail = function(deleteOptions, callback) {
    optionsToSend.url = buildUrl(deleteOptions.userId, deleteOptions.alternateEmailId);
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var buildUrl = function(userId, alternateEmailId) {
    return options.apiUrls.users + userId + '/alternateemails/' + (alternateEmailId || '');
  };
  
  return {
    addAlternateEmail: addAlternateEmail,
    getAlternateEmail: getAlternateEmail,
    listAlternateEmails: listAlternateEmails,
    makeAlternateEmailPrimary: makeAlternateEmailPrimary,
    deleteAlternateEmail: deleteAlternateEmail
  };
};
