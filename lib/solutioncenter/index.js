var _ = require('underscore');

exports.create = function(options) {
  var optionsToSend = {
    urls : options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  var getCategories = (getOptions, callback) => {
    var urlOption = { url: options.apiUrls.solutionCenter + "categories" };
    return options.requestor.get(_.extend(urlOption, optionsToSend, getOptions), callback);
  }

  var getTiles = (getOptions, callback) => {
    var urlOption = { url: options.apiUrls.solutionCenter + "categories/" + getOptions.categoryId + "/tiles" };
    return options.requestor.get(_.extend(urlOption, optionsToSend, getOptions), callback);
  }

  return {
    getCategories : getCategories,
    getTiles : getTiles
  };
};
