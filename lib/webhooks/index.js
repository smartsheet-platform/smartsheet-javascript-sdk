var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = _.extend({}, options.clientOptions);


  var createWebhook = (postOptions, callback) => {
    var urlOptions = {url: buildUrl()};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var deleteWebhook = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions.webhookId)};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var updateWebhook = (putOptions, callback) => {
    var urlOptions = {url: buildUrl(putOptions.webhookId)};
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var getWebhook = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions.webhookId)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listWebhooks = (getOptions, callback) => {
    var urlOptions = {url: buildUrl()};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var resetSharedSecret = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions.webhookId) + '/resetsharedsecret'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var buildUrl = webhookId =>
    options.apiUrls.webhooks + (webhookId || '');

  return {
    createWebhook: createWebhook,
    getWebhook: getWebhook,
    listWebhooks: listWebhooks,
    deleteWebhook: deleteWebhook,
    updateWebhook: updateWebhook,
    resetSharedSecret: resetSharedSecret
  };
};
