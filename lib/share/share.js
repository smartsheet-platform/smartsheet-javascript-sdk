var _ = require('underscore');

module.exports = url => ({
  create: function(options) {
    var requestor = options.requestor;

    var optionsToSend = {
      accessToken: options.accessToken
    };

    var listShares = (getOptions, callback) => {
      optionsToSend.url = buildUrl(getOptions);
      return requestor.get(_.extend(optionsToSend, getOptions), callback);
    };

    var share = (postOptions, callback) => {
      optionsToSend.url = buildUrl(postOptions);
      return requestor.post(_.extend(optionsToSend, postOptions), callback);
    };

    var deleteShare = (deleteOptions, callback) => {
      optionsToSend.url = buildUrl(deleteOptions);
      return requestor.delete(_.extend(optionsToSend, deleteOptions), callback);
    };

    var updateShare = (putOptions, callback) => {
      optionsToSend.url = buildUrl(putOptions);
      return requestor.put(_.extend(optionsToSend, putOptions), callback);
    };

    var buildUrl = (urlOptions) =>
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



