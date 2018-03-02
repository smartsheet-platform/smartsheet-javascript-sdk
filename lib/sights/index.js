var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;
  var shares = require('../share/share.js')(options.apiUrls.sights);

  var optionsToSend = _.extend({}, options.clientOptions);


  var getSight = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listSights = (getOptions, callback) => {
    var urlOptions = {url: options.apiUrls.sights};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var deleteSight = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var updateSight = (putOptions, callback) => {
    var urlOptions = {url: buildUrl(putOptions)};
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var copySight = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/copy'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var moveSight = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/move'};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var getSightPublishStatus = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions) + '/publish'};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var setSightPublishStatus = (putOptions, callback) => {
    var urlOptions = {url: buildUrl(putOptions) + '/publish'};
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sights + urlOptions.sightId;

  var sightObject = {
    listSights : listSights,
    getSight   : getSight,
    deleteSight : deleteSight,
    updateSight: updateSight,
    copySight: copySight,
    moveSight: moveSight,
    getSightPublishStatus: getSightPublishStatus,
    setSightPublishStatus: setSightPublishStatus
  };

  _.extend(sightObject, shares.create(options));

  return sightObject;
};
