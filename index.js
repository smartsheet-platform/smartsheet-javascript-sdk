var _ = require('underscore');
var winston = require('winston');
var apiUrls = require('./lib/utils/apis.js');

// Possible TODO: Namespace parameters for different subcomponents
// E.g. clientOptions.requestor.instance OR
//      clientOptions.requestor.settings
//          w/ sub-paths maxRetryTime and calcRetryBackoff

function buildRequestor(clientOptions) {
  if(clientOptions.requestor) return clientOptions.requestor;
  
  var requestorConfig =
    _.pick(clientOptions, 'maxRetryTime', 'calcRetryBackoff');

  requestorConfig.logger = buildLogger(clientOptions);
  
  return require('./lib/utils/httpRequestor.js')
    .create(requestorConfig);
};

function buildLogger(clientOptions) {
  return clientOptions.logger
    || (clientOptions.logContainer && clientOptions.logContainer.get('smartsheet'))
    || winston.loggers.get('smartsheet');
}

exports.createClient = function(clientOptions) {
  var requestor = buildRequestor(clientOptions);

  var options = {
    accessToken: clientOptions.accessToken,
    apiUrls: apiUrls,
    requestor: requestor
  };

  return {
    constants  : require('./lib/utils/constants.js'),
    contacts   : require('./lib/contacts/').create(options),
    favorites  : require('./lib/favorites/').create(options),
    folders    : require('./lib/folders/').create(options),
    groups     : require('./lib/groups/').create(options),
    home       : require('./lib/home/').create(options),
    images     : require('./lib/images/').create(options),
    reports    : require('./lib/reports/').create(options),
    search     : require('./lib/search/').create(options),
    server     : require('./lib/server/').create(options),
    sheets     : require('./lib/sheets/').create(options),
    sights     : require('./lib/sights/').create(options),
    templates  : require('./lib/templates/').create(options),
    tokens     : require('./lib/tokens/').create(options),
    users      : require('./lib/users/').create(options),
    webhooks   : require('./lib/webhooks/').create(options),
    workspaces : require('./lib/workspaces/').create(options)
  };
};
