var _ = require('underscore');
var types = require('../utils/constants').types;

exports.create = options => {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.favorites,
  };
  _.extend(optionsToSend, options.clientOptions);

  var listFavorites = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  var addItemsToFavorites = (postOptions, callback) =>
    requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  var handleFavorites = (postOptions, callback) => {
    var body = _.pick(postOptions, 'type', 'objectId');
    var options = _.omit(postOptions, 'type', 'objectId');

    options.body = body;
    return addItemsToFavorites(options, callback);
  };

  var buildFavoriteAddition = function(type) {
    return (postOptions, callback) => {
      var options = JSON.parse(JSON.stringify(postOptions));
      options.type = type;
      return handleFavorites(options, callback);
    };
  };

  var addSheetToFavorites = buildFavoriteAddition(types.sheet);

  var addFolderToFavorites = buildFavoriteAddition(types.folder);

  var addReportToFavorites = buildFavoriteAddition(types.report);

  var addTemplateToFavorites = buildFavoriteAddition(types.template);

  var addWorkspaceToFavorites = buildFavoriteAddition(types.workspace);

  var addSightToFavorites = buildFavoriteAddition(types.sight);

  var addMultipleToFavorites = (postOptions, callback) => {
    return requestor.post(_.extend({}, optionsToSend, postOptions), callback);
  };

  var removeFavorite = (deleteOptions, callback) => {
    var params = deleteOptions.queryParameters;
    if (params && _.isArray(params.objectIds)) {
      params.objectIds = params.objectIds.join(',');
    }

    var urlOptions = {url: options.apiUrls.favorites + deleteOptions.type + '/' + (deleteOptions.id || deleteOptions.objectId || '')};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var buildFavoriteRemoval = function(type) {
    return (deleteOptions, callback) => {
      var options = JSON.parse(JSON.stringify(deleteOptions));
      options.type = type;
      return removeFavorite(options, callback);
    };
  };

  var removeSheetFromFavorites = buildFavoriteRemoval(types.sheet);

  var removeFolderFromFavorites = buildFavoriteRemoval(types.folder);

  var removeReportFromFavorites = buildFavoriteRemoval(types.report);

  var removeTemplateFromFavorites = buildFavoriteRemoval(types.template);

  var removeWorkspaceFromFavorites = buildFavoriteRemoval(types.workspace);

  var removeSightFromFavorites = buildFavoriteRemoval(types.sight);

  return {
    listFavorites : listFavorites,
    addItemsToFavorites : addItemsToFavorites,
    addSheetToFavorites : addSheetToFavorites,
    addFolderToFavorites : addFolderToFavorites,
    addReportToFavorites : addReportToFavorites,
    addTemplateToFavorites : addTemplateToFavorites,
    addSightToFavorites : addSightToFavorites,
    addWorkspaceToFavorites : addWorkspaceToFavorites,
    addMultipleToFavorites : addMultipleToFavorites,
    removeSheetFromFavorites : removeSheetFromFavorites,
    removeFolderFromFavorites : removeFolderFromFavorites,
    removeReportFromFavorites : removeReportFromFavorites,
    removeTemplateFromFavorites : removeTemplateFromFavorites,
    removeSightFromFavorites : removeSightFromFavorites,
    removeWorkspaceFromFavorites : removeWorkspaceFromFavorites,
    //convenience methods to remove multiples.
    //Uses the same as the singular remove methods.
    removeSheetsFromFavorites : removeSheetFromFavorites,
    removeFoldersFromFavorites : removeFolderFromFavorites,
    removeReportsFromFavorites : removeReportFromFavorites,
    removeTemplatesFromFavorites : removeTemplateFromFavorites,
    removeSightsFromFavorites : removeSightFromFavorites,
    removeWorkspacesFromFavorites : removeWorkspaceFromFavorites
  };
};
