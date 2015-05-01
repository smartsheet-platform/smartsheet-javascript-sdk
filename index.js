var apiUrls = require('./lib/utils/apis.js');
var _ = require('underscore');

exports.createClient = function(options) {
    return {
      // constants  : require('./lib/utils/constants.js'),
      favorites  : require('./lib/favorites/').create({accessToken: options.accessToken, apiUrls: apiUrls}),
      folders    : require('./lib/folders/').create({accessToken: options.accessToken, apiUrls: apiUrls}),
      groups     : require('./lib/groups/').create({accessToken: options.accessToken, apiUrls: apiUrls}),
      home       : require('./lib/home/').create({accessToken: options.accessToken, apiUrls: apiUrls}),
      reports    : require('./lib/reports/').create({accessToken: options.accessToken, apiUrls: apiUrls}),
      search     : require('./lib/search/').create({accessToken: options.accessToken, apiUrls: apiUrls}),
      server     : require('./lib/server/').create({accessToken: options.accessToken, apiUrls: apiUrls}),
      sheets     : require('./lib/sheets/').create({accessToken: options.accessToken, apiUrls: apiUrls}),
      templates  : require('./lib/templates/').create({accessToken: options.accessToken, apiUrls: apiUrls}),
      users      : require('./lib/users/').create({accessToken: options.accessToken, apiUrls: apiUrls}),
      workspaces : require('./lib/workspaces/').create({accessToken: options.accessToken, apiUrls: apiUrls})
    };
};
