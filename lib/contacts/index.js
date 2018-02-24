var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
      url: options.apiUrls.contacts,
      accessToken : options.accessToken,
      userAgent: options.userAgent
  };

  var getContact = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  return {
    getContact : getContact,
    listContacts : getContact
  };
};
