var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');


module.exports = function(url) {
  return {
    create : function(options) {
      var optionsToSend = {
        accessToken: options.accessToken,
        maxRetryTime : options.maxRetryTime,
        calcRetryBackoff: options.calcRetryBackoff
      };

      var listShares = function (getOptions, callback) {
        var urlOptions = {url: buildUrl(getOptions)};
        return utils.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
      };

      var share = function (postOptions, callback) {
        var urlOptions = {url: buildUrl(postOptions)};
        return utils.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
      };

      var deleteShare = function (deleteOptions, callback) {
        var urlOptions = {url: buildUrl(deleteOptions)};
        return utils.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
      };

      var updateShare = function (putOptions, callback) {
        var urlOptions = {url: buildUrl(putOptions)};
        return utils.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
      };

      var buildUrl = function (urlOptions) {
        return url + (urlOptions.sheetId || urlOptions.workspaceId || urlOptions.reportId || urlOptions.sightId) + '/shares/' + (urlOptions.shareId || '');
      };

      return {
        getShare: listShares,
        listShares: listShares,
        share: share,
        deleteShare: deleteShare,
        updateShare: updateShare
      };
    }
  };
};



