var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var shares = require('../share/share.js')(options.apiUrls.sights);

  var optionsToSend = {
    url: options.apiUrls.sights,
    accessToken : options.accessToken
  };

  var getSight = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var deleteSight = function(deleteOptions, callback) {
    optionsToSend.url = options.apiUrls.sights;
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var buildSightObject = function() {
    var sightObject = {
      listSights : getSight,
      getSight   : getSight,
      deleteSight : deleteSight
    };
    
    sightObject = _.extend(sightObject, shares.create(options));
    return sightObject;
  };

  return buildSightObject();
};
