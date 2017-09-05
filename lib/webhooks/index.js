var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;
  
  var optionsToSend = {
    accessToken : options.accessToken
  };

  var createWebhook = (postOptions, callback) => {
    optionsToSend.url = buildUrl();
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var deleteWebhook = (deleteOptions, callback) => {
    optionsToSend.url = buildUrl(deleteOptions.webhookId);
    return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var updateWebhook = (putOptions, callback) => {
    optionsToSend.url = buildUrl(putOptions.webhookId);
    return requestor.put(_.extend(optionsToSend, putOptions), callback);
  };

  var getWebhook = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions.webhookId);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var listWebhooks = (getOptions, callback) => {
    optionsToSend.url = buildUrl();
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var resetSharedSecret = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions.webhookId) + '/resetsharedsecret';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
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
