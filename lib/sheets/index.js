var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var attachments = require('./attachments.js');
var columns = require('./columns.js');
var comments = require('./comments.js');
var createSheets = require('./create.js');
var discussions = require('./discussions');
var getSheets = require('./get.js');
var rows = require('./rows.js');

exports.create = function(options) {
  var shares = require('../share/share.js')(options.apiUrls.sheets);
  
  var optionsToSend = {
    //url: ,
    urls : options.apiUrls,
    accessToken : options.accessToken
  };

  var updateSheet = function(putOptions, callback) {
      optionsToSend.url = options.apiUrls.sheets;
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var deleteSheet = function(deleteOptions, callback) {
    optionsToSend.url = options.apiUrls.sheets;
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var sendSheetViaEmail = function(postOptions, callback) {
    optionsToSend.url = options.apiUrls.sheets + postOptions.sheetId + '/emails';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var getPublishStatus = function(getOptions, callback) {
    optionsToSend.url = options.apiUrls.sheets + getOptions.sheetId + '/publish';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var setPublishStatus = function(putOptions, callback) {
    optionsToSend.url = options.apiUrls.sheets + putOptions.sheetId + '/publish';
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var buildSheetObject = function() {
    var sheetObject = {
      sendSheetViaEmail : sendSheetViaEmail,
      getPublishStatus : getPublishStatus,
      setPublishStatus : setPublishStatus,
      updateSheet : updateSheet,
      deleteSheet : deleteSheet
    };

    sheetObject = _.extend(sheetObject, attachments.create(options));
    sheetObject = _.extend(sheetObject, columns.create(options));
    sheetObject = _.extend(sheetObject, comments.create(options));
    sheetObject = _.extend(sheetObject, createSheets.create(options));
    sheetObject = _.extend(sheetObject, discussions.create(options));
    sheetObject = _.extend(sheetObject, getSheets.create(options));
    sheetObject = _.extend(sheetObject, rows.create(options));
    sheetObject = _.extend(sheetObject, shares.create(options));
    return sheetObject;
  };

  return buildSheetObject();
};
