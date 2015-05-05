var apiUrls = require('./lib/utils/apis.js');

exports.createClient = function(options) {
  var options = {
    accessToken: options.accessToken,
    apiUrls: apiUrls
  };
  return {
    constants  : require('./lib/utils/constants.js'),
    favorites  : require('./lib/favorites/').create(options),
    folders    : require('./lib/folders/').create(options),
    groups     : require('./lib/groups/').create(options),
    home       : require('./lib/home/').create(options),
    reports    : require('./lib/reports/').create(options),
    search     : require('./lib/search/').create(options),
    server     : require('./lib/server/').create(options),
    sheets     : require('./lib/sheets/').create(options),
    templates  : require('./lib/templates/').create(options),
    users      : require('./lib/users/').create(options),
    workspaces : require('./lib/workspaces/').create(options)
  };
};
