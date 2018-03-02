var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = _.extend({}, options.clientOptions);

  var deleteAutomationRule = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var getAutomationRule = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listAutomationRules = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var updateAutomationRule = (putOptions, callback) => {
    var urlOptions = {url: buildUrl(putOptions)};
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/automationrules/' + (urlOptions.automationRuleId || '');

  return {
    deleteAutomationRule : deleteAutomationRule,
    getAutomationRule : getAutomationRule,
    listAutomationRules : listAutomationRules,
    updateAutomationRule : updateAutomationRule
  };
};
