var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    accessToken : options.accessToken
  };

  var addAlternateEmail = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions.userId)};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var getAlternateEmail = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions.userId, getOptions.alternateEmailId)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listAlternateEmails = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions.userId)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var makeAlternateEmailPrimary = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions.userId, postOptions.alternateEmailId) + '/makeprimary'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var deleteAlternateEmail = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions.userId, deleteOptions.alternateEmailId)};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var buildUrl = (userId, alternateEmailId) =>
    options.apiUrls.users + userId + '/alternateemails/' + (alternateEmailId || '');
  
  return {
    addAlternateEmail: addAlternateEmail,
    getAlternateEmail: getAlternateEmail,
    listAlternateEmails: listAlternateEmails,
    makeAlternateEmailPrimary: makeAlternateEmailPrimary,
    deleteAlternateEmail: deleteAlternateEmail
  };
};
