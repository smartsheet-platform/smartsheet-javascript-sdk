var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.events
  };
  _.extend(optionsToSend, options.clientOptions);

  var getEvents = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  return {
    getEvents : getEvents
  };
};
