var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.home,
    accessToken : options.accessToken
  };

  var listContents = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var listFolders = function(getOptions, callback) {
    return listContents(_.extend({url: options.apiUrls.home + 'folders'}, getOptions), callback);
  };

  var createFolder = function(postOptions, callback) {
    optionsToSend.url = options.apiUrls.home + 'folders';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  return {
    listContents : listContents,
    listFolders  : listFolders,
    createFolder : createFolder
  };
};
