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

  var getFolders = function(getOptions, callback) {
    return getHome({url: options.apiUrls.home + 'folders'}, callback);
  };

  var createFolder = function(postOptions, callback) {
    optionsToSend.url = options.apiUrls.home + 'folders';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  return {
    getHome              : getHome,
    getFolders           : getFolders,
    createFolder     : createFolder
  };
};
