var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken
  };

  var createWebhook = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions);
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var createWebhook = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions);
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.webhooks + (urlOptions.webhookId || '');
  };

  return {
    createWebhook: createWebhook
  };
};
