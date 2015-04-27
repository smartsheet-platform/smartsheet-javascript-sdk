var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.reports,
    urls : options.apiUrls,
    accessToken : options.accessToken
  };

  var getReport = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getReportShares = function(getOptions, callback) {
    optionsToSend.url = buildUrl(getOptions);
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var sendReportAsEmail = function(postOptions, callback) {
    optionsToSend.url = options.apiUrls.reports + postOptions.reportId + '/emails';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var shareReportWithGroups  = function(postOptions, callback) {
    optionsToSend.url = buildUrl(postOptions);
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var shareReportWithGroupsAndSendEmail  = function(postOptions, callback) {
    optionsToSend.queryParameters = {sendEmail: true};
    return shareReportWithGroups(_.extend(optionsToSend, postOptions), callback);
  };

  //TODO: Add method to share with USER or GROUP and specify them by name
  var updateShareWithGroups = function(putOptions, callback) {
    //optionsToSend.url = options.apiUrls.reports + putOptions.reportId + '/shares/' + options.shareId;
    optionsToSend.url = buildUrl(putOptions);
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var deleteShareWithGroups = function(deleteOptions, callback) {
    optionsToSend.url = buildUrl(deleteOptions);
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.reports + urlOptions.reportId + '/shares/' + (options.shareId || '');
  };

  return {
    getReport         : getReport,
    getReportShare    : getReportShares,
    getReportShares   : getReportShares,
    sendReportAsEmail : sendReportAsEmail,
    shareReportWithGroups : shareReportWithGroups,
    shareReportWithGroupsAndSendEmail : shareReportWithGroupsAndSendEmail,
    updateShareWithGroups : updateShareWithGroups,
    deleteShareWithGroups : deleteShareWithGroups
  };
};
