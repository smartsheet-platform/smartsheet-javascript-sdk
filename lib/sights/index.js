var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var shares = require('../share/share.js')(options.apiUrls.sights);

  var optionsToSend = {
    accessToken : options.accessToken
  };

  var getSight = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var deleteSight = function(deleteOptions, callback) {
    optionsToSend.url = buildUrl(deleteOptions);
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var updateSight = function(putOptions, callback) {
    optionsToSend.url = buildUrl(putOptions);
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var copySight = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + '/copy';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var moveSight = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions) + '/move';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var getSightPublishStatus = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions) + '/publish';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var setSightPublishStatus = function(putOptions, callback) {
    optionsToSend.url = buildUrl(putOptions) + '/publish';
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.sights + (urlOptions.sightId || '');
  };

  var buildSightObject = function() {
    var sightObject = {
      listSights : getSight,
      getSight   : getSight,
      deleteSight : deleteSight,
      updateSight: updateSight,
      copySight: copySight,
      moveSight: moveSight,
      getSightPublishStatus: getSightPublishStatus,
      setSightPublishStatus: setSightPublishStatus
    };
    
    sightObject = _.extend(sightObject, shares.create(options));
    return sightObject;
  };

  return buildSightObject();
};
