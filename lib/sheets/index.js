var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var attachments = require('./attachments');
var columns = require('./columns');
var createSheets = require('./create.js');
var discussions = require('./discussions');
var getSheets = require('./get.js');
var rows = require('./rows.js');
var shares = require('../share/share.js');

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.sheets,
    urls : options.apiUrls,
    accessToken : options.accessToken
  };


  var updateSheet = function(putOptions, callback) {
    return utils.put(_.extend(optionsToSend, putOptions), callback);
  };

  var deleteSheet = function(deleteOptions, callback) {
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var sendSheetAsEmail = function(postOptions, callback) {
    optionsToSend.url = options.apiUrls.sheets + postOptions.sheetId + '/emails';
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var getPublishStatus = function(getOptions, callback) {
    optionsToSend.url = options.apiUrls.sheets + postOptions.sheetId + '/publish';
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var setPublishStatus = function(getOptions, callback) {
    optionsToSend.url = options.apiUrls.sheets + postOptions.sheetId + '/publish';
    return utils.put(_.extend(optionsToSend, getOptions), callback);
  };

  var buildSheetObject = function() {
    var sheetObject = {
      sendSheetAsEmail : sendSheetAsEmail,
      getPublishStatus : getPublishStatus,
      setPublishStatus : setPublishStatus,
      updateSheet : updateSheet,
      deleteSheet : deleteSheet
    };

    sheetObject = _.extend(sheetObject, attachments.create(options));
    sheetObject = _.extend(sheetObject, columns.create(options));
    sheetObject = _.extend(sheetObject, createSheets.create(options));
    sheetObject = _.extend(sheetObject, discussions.create(options));
    sheetObject = _.extend(sheetObject, getSheets.create(options));
    sheetObject = _.extend(sheetObject, rows.create(options));
    sheetObject = _.extend(sheetObject, shares.create(_.extend(options, {url: optionsToSend.url})));
    return sheetObject;
  };

  return buildSheetObject();
};
