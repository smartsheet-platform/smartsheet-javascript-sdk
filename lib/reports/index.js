var _ = require('underscore');

exports.create = function(options) {
  var shares = require('../share/share.js')(options.apiUrls.reports);
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.reports,
    accessToken : options.accessToken,
    maxRetryTime : options.maxRetryTime,
    calcRetryBackoff: options.calcRetryBackoff
  };

  var getReport = (getOptions, callback) =>
    requestor.get(_.extend(optionsToSend, getOptions), callback);

  var sendReportViaEmail = (postOptions, callback) => {
    optionsToSend.url = options.apiUrls.reports + postOptions.reportId + '/emails';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var getReportAsExcel = (getOptions, callback) => {
    optionsToSend.accept = 'application/vnd.ms-excel';
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var getReportAsCSV = (getOptions, callback) => {
    optionsToSend.accept = 'text/csv';
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };
  
  var getReportPublishStatus = (getOptions, callback) => {
    optionsToSend.url = options.apiUrls.reports + getOptions.reportId + '/publish';
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var setReportPublishStatus = (putOptions, callback) => {
    optionsToSend.url = options.apiUrls.reports + putOptions.reportId + '/publish';
    return requestor.put(_.extend(optionsToSend, putOptions), callback);
  };

  return function() {
    var reportObject = {
      listReports : getReport,
      getReport : getReport,
      sendReportViaEmail : sendReportViaEmail,
      getReportAsExcel : getReportAsExcel,
      getReportAsCSV : getReportAsCSV,
      getReportPublishStatus : getReportPublishStatus,
      setReportPublishStatus : setReportPublishStatus
    };
    
    return _.extend(reportObject, shares.create(options));
  }();
};
