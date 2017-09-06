var _ = require('underscore');
var apiUrls = require('./lib/utils/apis.js');

exports.createClient = function(clientOptions) {
  var requestor = clientOptions.requestor;
  if(!requestor) {
    var requestorConfig = _.pick(clientOptions, 'maxRetryTime', 'calcRetryBackoff');
    requestor = require('./lib/utils/httpRequestor.js').create(requestorConfig);
  }

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
