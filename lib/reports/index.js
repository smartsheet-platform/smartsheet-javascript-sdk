var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
  var shares = require('../share/share.js')(options.apiUrls.reports);

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

  var getReportAsExcel = function(getOptions, callback) {
    optionsToSend.accept = 'application/vnd.ms-excel';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getReportAsCSV = function(getOptions, callback) {
    optionsToSend.accept = 'text/csv';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };
  
  var getReportPublishStatus = function(getOptions, callback) {
    optionsToSend.url = options.apiUrls.reports + getOptions.reportId + '/publish';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var setReportPublishStatus = function(putOptions, callback) {
    optionsToSend.url = options.apiUrls.reports + putOptions.reportId + '/publish';
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var buildReportObject = function() {
    var reportObject = {
      listReports : getReport,
      getReport         : getReport,
      sendReportViaEmail : sendReportViaEmail,
      getReportAsExcel : getReportAsExcel,
      getReportAsCSV : getReportAsCSV,
      getReportPublishStatus : getReportPublishStatus,
      setReportPublishStatus : setReportPublishStatus
    };
    
    reportObject = _.extend(reportObject, shares.create(options));
    return reportObject;
  };

  return buildReportObject();
};
