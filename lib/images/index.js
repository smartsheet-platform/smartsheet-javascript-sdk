var utils = require('../utils/httpUtils.js');
var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.imageUrls,
    accessToken : options.accessToken
  };

  var listImageUrls = function(postOptions, callback) {
    return utils.post(_.extend({}, optionsToSend, postOptions), callback);
  };

  return {
    listImageUrls : listImageUrls
  };
};
