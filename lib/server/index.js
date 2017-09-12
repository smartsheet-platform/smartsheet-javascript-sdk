exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.server,
    urls : options.apiUrls,
    accessToken : options.accessToken
  };

  var getInfo = (getOptions, callback) =>
    options.requestor.get(optionsToSend, callback);

  return {
    getInfo : getInfo
  };
};
