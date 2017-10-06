var _ = require('underscore');
var winston = require('winston');
var apiUrls = require('./lib/utils/apis.js');

// Possible TODO: Namespace parameters for different subcomponents
// E.g. clientOptions.requestor.instance OR
//      clientOptions.requestor.settings
//          w/ sub-paths maxRetryDurationSeconds and calcRetryBackoff

function buildRequestor(clientOptions) {
  if(clientOptions.requestor) return clientOptions.requestor;
  
  var requestorConfig =
    _.pick(clientOptions, 'maxRetryDurationSeconds', 'calcRetryBackoff');
  
  if(requestorConfig.maxRetryDurationSeconds)
    requestorConfig.maxRetryDurationMillis = requestorConfig.maxRetryDurationSeconds * 1000;

  requestorConfig.logger = buildLogger(clientOptions);
  
  return require('./lib/utils/httpRequestor.js')
    .create(requestorConfig);
};

function buildLogger(clientOptions) {
  if(hasMultipleLogOptions(clientOptions)) {
    throw new Error(
      "Smartsheet client options may specify at most one of " +
      "'logger', 'loggerContainer', and 'logLevel'.");
  }
  
  if(clientOptions.logger) return clientOptions.logger;

  if(clientOptions.logLevel) return buildLoggerFromLevel(clientOptions.logLevel);

  if(clientOptions.loggerContainer) return buildLoggerFromContainer(clientOptions.loggerContainer);

  return null;
}

function hasMultipleLogOptions(clientOptions) {
  return (clientOptions.logger && clientOptions.loggerContainer)
  || (clientOptions.logger && clientOptions.logLevel)
  || (clientOptions.loggerContainer && clientOptions.logLevel);
}

function buildLoggerFromLevel(logLevel) {
  if(winston.levels[logLevel] == null) {
    throw new Error(
      'Smartsheet client received configuration with invalid log level ' +
      `'${logLevel}'. Use one of the standard Winston log levels.`);
  }

  return new (winston.Logger)({
    transports: [
      new winston.transports.Console({
        level: logLevel,
        showLevel: false,
        label: 'Smartsheet'
      })
    ]
  });
}

function buildLoggerFromContainer(container) {
  if(container.has('smartsheet'))
    return container.get('smartsheet');
  else
    throw new Error(
      "Smartsheet client received a logger container, but could not find a logger named " +
      "'smartsheet' inside.");
}

exports.createClient = function(clientOptions) {
  var requestor = buildRequestor(clientOptions);

  var options = {
    accessToken: clientOptions.accessToken || process.env.SMARTSHEET_ACCESS_TOKEN,
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
