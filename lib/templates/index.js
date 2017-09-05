var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;
  
  var optionsToSend = {
    url: options.apiUrls.templates,
    accessToken : options.accessToken
  };

  var listUserCreatedTemplates = (getOptions, callback) =>
    requestor.get(_.extend(optionsToSend, getOptions), callback);

  var listPublicTemplates = (getOptions, callback) => {
    optionsToSend.url = options.apiUrls.templatesPublic;
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  return {
    listUserCreatedTemplates : listUserCreatedTemplates,
    listPublicTemplates : listPublicTemplates
  };
};
