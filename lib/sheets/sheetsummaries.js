var _ = require('underscore');

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = _.extend({}, options.clientOptions);

  var getSummary = (getOptions, callback) => {
    var urlOptions = {url: buildSummaryUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  }

  var getSummaryFields = (getOptions, callback) => {
    var urlOptions = {url: buildFieldsUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  }

  var addSummaryFields = (postOptions, callback) => {
    var urlOptions = {url: buildFieldsUrl(postOptions)};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  }

  var deleteSummaryFields = (deleteOptions, callback) => {
    var urlOptions = {url: buildFieldsUrl(deleteOptions)};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  }

  var updateSummaryFields = (putOptions, callback) => {
    var urlOptions = {url: buildFieldsUrl(putOptions)};
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  }

  var addSummaryFieldImage = (postOptions, callback) => {
    var urlOptions = {url: buildFieldImagesUrl(postOptions)};
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  }

  var buildSummaryUrl = urlOptions => options.apiUrls.sheets + urlOptions.sheetId + '/summary';

  var buildFieldsUrl = urlOptions => buildSummaryUrl(urlOptions) + '/fields'

  var buildFieldImagesUrl = urlOptions =>
    buildFieldsUrl(urlOptions) + '/' + urlOptions.fieldId + '/images'

  return {
    getSummary: getSummary,
    getSummaryFields: getSummaryFields,
    addSummaryFields: addSummaryFields,
    deleteSummaryFields: deleteSummaryFields,
    updateSummaryFields: updateSummaryFields,
    addSummaryFieldImage: addSummaryFieldImage
  };
};
