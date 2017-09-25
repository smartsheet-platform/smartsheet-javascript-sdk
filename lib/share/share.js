var _ = require('underscore');

module.exports = url => ({
  create: function(options) {
    var requestor = options.requestor;

    var optionsToSend = {
      accessToken: options.accessToken
    };

    var listShares = (getOptions, callback) => {
      var urlOptions = {url: buildUrl(getOptions)};
      return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
    };

    var share = (postOptions, callback) => {
      var urlOptions = {url: buildUrl(postOptions)};
      return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
    };

    var deleteShare = (deleteOptions, callback) => {
      var urlOptions = {url: buildUrl(deleteOptions)};
      return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
    };

    var updateShare = (putOptions, callback) => {
      var urlOptions = {url: buildUrl(putOptions)};
      return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
    };

    var buildUrl = urlOptions =>
      url + (urlOptions.sheetId || urlOptions.workspaceId || urlOptions.reportId || urlOptions.sightId) + '/shares/' + (urlOptions.shareId || '');

    return {
      getShare: listShares,
      listShares: listShares,
      share: share,
      deleteShare: deleteShare,
      updateShare: updateShare
    };
  }
});



