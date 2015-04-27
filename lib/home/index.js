var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.home,
    accessToken : options.accessToken
  };

  var getHome = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getHomeWithTemplates = function(getOptions, callback) {
    var parametersToSend = {
      queryParameters : {
        include: 'templates'
      }
    };
    return getHome(parametersToSend, callback);
  };

  var getHomeWithTemplates = function(getOptions, callback) {
    var parametersToSend = {
      queryParameters : {
        include: 'templates'
      }
    };
    return getHome(parametersToSend, callback);
  };

  var getHomeFolders = function(getOptions, callback) {
    return getHome({url: options.apiUrls.home + 'folders'}, callback);
  };

  var createHomeFolder = function(postOptions, callback) {
    optionsToSend.url = options.apiUrls.home + 'folders';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  return {
    getHome              : getHome,
    getHomeFolders       : getHomeFolders,
    getHomeWithTemplates : getHomeWithTemplates,
    createHomeFolder     : createHomeFolder
  };
};
