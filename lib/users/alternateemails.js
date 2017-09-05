var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    accessToken : options.accessToken
  };

  var addAlternateEmail = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions.userId);
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var getAlternateEmail = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions.userId, postOptions.alternateEmailId);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var listAlternateEmails = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions.userId);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var makeAlternateEmailPrimary = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions.userId, postOptions.alternateEmailId) + '/makeprimary';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var deleteAlternateEmail = (deleteOptions, callback) => {
    optionsToSend.url = buildUrl(deleteOptions.userId, deleteOptions.alternateEmailId);
    return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
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
