var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.templates,
    accessToken : options.accessToken
  };

  var listUserCreatedTemplates = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var listPublicTemplates = function(getOptions, callback) {
    optionsToSend.url = options.apiUrls.templatesPublic;
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  return {
    listUserCreatedTemplates : listUserCreatedTemplates,
    listPublicTemplates : listPublicTemplates
  };
};
