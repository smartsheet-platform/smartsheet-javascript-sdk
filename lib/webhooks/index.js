var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var createWebhook = function(postOptions, callback) {
    var urlOptions = {url: buildUrl()};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var deleteWebhook = function(deleteOptions, callback) {
    var urlOptions = {url: buildUrl(deleteOptions.webhookId)};
    return utils.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var updateWebhook = function(putOptions, callback) {
    var urlOptions = {url: buildUrl(putOptions.webhookId)};
    return utils.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var getWebhook = function(getOptions, callback) {
    var urlOptions = {url: buildUrl(getOptions.webhookId)};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listWebhooks = function(getOptions, callback) {
    var urlOptions = {url: buildUrl()};
    return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var resetSharedSecret = function(postOptions, callback) {
    var urlOptions = {url: buildUrl(postOptions.webhookId) + '/resetsharedsecret'};
    return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
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
