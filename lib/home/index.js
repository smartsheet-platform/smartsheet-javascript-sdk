var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.home,
    accessToken : options.accessToken,
  };

  var listContents = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  var listFolders = (getOptions, callback) =>
    listContents(_.extend({url: options.apiUrls.home + 'folders'}, getOptions), callback);

  var createFolder = (postOptions, callback) => {
    var urlOptions = {url: options.apiUrls.home + 'folders'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  return {
    listContents : listContents,
    listFolders  : listFolders,
    createFolder : createFolder
  };
};
