var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken
  };

  var createWebhook = function(postOptions, callback) {
    optionsToSend.url = buildUrl();
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var deleteWebhook = function(deleteOptions, callback) {
    optionsToSend.url = buildUrl(deleteOptions.webhookId);
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var updateWebhook = function(putOptions, callback) {
    optionsToSend.url = buildUrl(putOptions.webhookId);
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var getWebhook = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions.webhookId);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var listWebhooks = function(getOptions, callback) {
    optionsToSend.url = buildUrl();
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var resetSharedSecret = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions.webhookId) + '/resetsharedsecret';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var buildUrl = function(webhookId) {
    return options.apiUrls.webhooks + (webhookId || '');
  };

  return {
    createWebhook: createWebhook,
    getWebhook: getWebhook,
    listWebhooks: listWebhooks,
    deleteWebhook: deleteWebhook,
    updateWebhook: updateWebhook,
    resetSharedSecret: resetSharedSecret
  };
};
