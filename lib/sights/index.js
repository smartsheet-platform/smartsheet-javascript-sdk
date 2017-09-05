var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;
  var shares = require('../share/share.js')(options.apiUrls.sights);

  var optionsToSend = {
    accessToken : options.accessToken
  };

  var getSight = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions);
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var deleteSight = (deleteOptions, callback) => {
    optionsToSend.url = buildUrl(deleteOptions);
    return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var updateSight = (putOptions, callback) => {
    optionsToSend.url = buildUrl(putOptions);
    return requestor.put(_.extend(optionsToSend, putOptions), callback);
  };

  var copySight = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/copy';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var moveSight = (postOptions, callback) => {
    optionsToSend.url = buildUrl(postOptions) + '/move';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var getSightPublishStatus = (getOptions, callback) => {
    optionsToSend.url = buildUrl(getOptions) + '/publish';
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var setSightPublishStatus = (putOptions, callback) => {
    optionsToSend.url = buildUrl(putOptions) + '/publish';
    return requestor.put(_.extend(optionsToSend, putOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sights + (urlOptions.sightId || '');

  return function() {
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
  }();
};
