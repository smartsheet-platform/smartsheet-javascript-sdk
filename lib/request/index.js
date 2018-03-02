var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = _.extend({}, options.clientOptions);

  var get = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  var post = (postOptions, callback) =>
    requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  var put = (putOptions, callback) =>
    requestor.put(_.extend({}, optionsToSend, putOptions), callback);

  var postFile = (postOptions, callback) =>
    requestor.postFile(_.extend({}, optionsToSend, postOptions), callback);

  var deleteRequest = (deleteOptions, callback) =>
    requestor.delete(_.extend({}, optionsToSend, deleteOptions), callback);

  return {
    get : get,
    post  : post,
    put : put,
    postFile : postFile,
    delete : deleteRequest
  };
};
