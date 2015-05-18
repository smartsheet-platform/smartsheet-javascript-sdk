var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var shares = require('../share/share.js');

  var optionsToSend = {
    url: options.apiUrls.reports,
    accessToken : options.accessToken
  };

  var getReport = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var sendReportViaEmail = function(postOptions, callback) {
    optionsToSend.url = options.apiUrls.reports + postOptions.reportId + '/emails';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var buildUrl = function(urlOptions) {
    return options.apiUrls.reports + urlOptions.reportId + '/shares/' + (options.shareId || '');
  };

  var buildReportObject = function() {
    var reportObject = {
      getReport         : getReport,
      sendReportViaEmail : sendReportViaEmail,
    };
    
    reportObject = _.extend(reportObject, shares.create(_.extend(options, {url: optionsToSend.url})));
    return reportObject;
  }

  return buildReportObject();
};
