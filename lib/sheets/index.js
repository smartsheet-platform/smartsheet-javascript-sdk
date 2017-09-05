var _ = require('underscore');
var attachments = require('./attachments.js');
var columns = require('./columns.js');
var comments = require('./comments.js');
var createSheets = require('./create.js');
var discussions = require('./discussions');
var getSheets = require('./get.js');
var rows = require('./rows.js');
var sentUpdateRequests = require('./sentupdaterequests.js');
var updateRequests = require('./updaterequests.js');

exports.create = function(options) {
  var requestor = options.requestor;
  var shares = require('../share/share.js')(options.apiUrls.sheets);
  
  var optionsToSend = {
    urls : options.apiUrls,
    accessToken : options.accessToken
  };

  var updateSheet = (putOptions, callback) => {
    optionsToSend.url = options.apiUrls.sheets;
    return requestor.put(_.extend(optionsToSend, putOptions), callback);
  };

  var deleteSheet = (deleteOptions, callback) => {
    optionsToSend.url = options.apiUrls.sheets;
    return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var sendSheetViaEmail = (postOptions, callback) => {
    optionsToSend.url = options.apiUrls.sheets + postOptions.sheetId + '/emails';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var moveSheet = (postOptions, callback) => {
    optionsToSend.url = options.apiUrls.sheets + postOptions.sheetId + '/move';
    return requestor.post(_.extend(optionsToSend, postOptions), callback);
  };

  var getPublishStatus = (getOptions, callback) => {
    optionsToSend.url = options.apiUrls.sheets + getOptions.sheetId + '/publish';
    return requestor.get(_.extend(optionsToSend, getOptions), callback);
  };

  var setPublishStatus = (putOptions, callback) => {
    optionsToSend.url = options.apiUrls.sheets + putOptions.sheetId + '/publish';
    return requestor.put(_.extend(optionsToSend, putOptions), callback);
  };

  return function() {
    var sheetObject = {
      sendSheetViaEmail : sendSheetViaEmail,
      getPublishStatus : getPublishStatus,
      setPublishStatus : setPublishStatus,
      updateSheet : updateSheet,
      deleteSheet : deleteSheet,
      moveSheet : moveSheet
    };

    sheetObject = _.extend(sheetObject, attachments.create(options));
    sheetObject = _.extend(sheetObject, columns.create(options));
    sheetObject = _.extend(sheetObject, comments.create(options));
    sheetObject = _.extend(sheetObject, createSheets.create(options));
    sheetObject = _.extend(sheetObject, discussions.create(options));
    sheetObject = _.extend(sheetObject, getSheets.create(options));
    sheetObject = _.extend(sheetObject, rows.create(options));
    sheetObject = _.extend(sheetObject, sentUpdateRequests.create(options));
    sheetObject = _.extend(sheetObject, shares.create(options));
    sheetObject = _.extend(sheetObject, updateRequests.create(options));
    return sheetObject;
  }();
};
