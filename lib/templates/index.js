var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.templates
  };
  _.extend(optionsToSend, options.clientOptions);


  var listUserCreatedTemplates = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  var listPublicTemplates = (getOptions, callback) => {
    var urlOptions = {url: options.apiUrls.templatesPublic};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  return {
    listUserCreatedTemplates : listUserCreatedTemplates,
    listPublicTemplates : listPublicTemplates
  };
};
