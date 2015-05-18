var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');


module.exports = function(url) {
  return {
    create : function(options) {
      var optionsToSend = {
        accessToken: options.accessToken
      };

      var listShares = function (getOptions, callback) {
        optionsToSend.url = buildUrl(getOptions);
        return utils.get(_.extend(optionsToSend, getOptions), callback);
      };

      var share = function (postOptions, callback) {
        optionsToSend.url = buildUrl(postOptions);
        return utils.post(_.extend(optionsToSend, postOptions), callback);
      };

      var deleteShare = function (deleteOptions, callback) {
        optionsToSend.url = buildUrl(deleteOptions);
        return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
      };

      var updateShare = function (putOptions, callback) {
        optionsToSend.url = buildUrl(putOptions);
        return utils.put(_.extend(optionsToSend, putOptions), callback);
      };

      var buildUrl = function (urlOptions) {
        return url + (urlOptions.sheetId || urlOptions.workspaceId || urlOptions.reportId) + '/shares/' + (urlOptions.shareId || '');
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



