var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var types = require('../utils/constants').types;

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.favorites,
    accessToken : options.accessToken
  };

  var listFavorites = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var addItemsToFavorites = function(postOptions, callback) {
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  var handleFavorites = function(postOptions, callback) {
    var body = {
      type : postOptions.type,
      objectId: postOptions.objectId
    };
    return addItemsToFavorites({body: body}, callback);
  };

  var addSheetToFavorites = function(postOptions, callback) {
    postOptions.type = types.sheet;
    return handleFavorites(postOptions, callback);
  };

  var addFolderToFavorites = function(postOptions, callback) {
    postOptions.type = types.folder;
    return handleFavorites(postOptions, callback);
  };

  var addReportToFavorites = function(postOptions, callback) {
    postOptions.type = types.report;
    return handleFavorites(postOptions, callback);
  };

  var addTemplateToFavorites = function(postOptions, callback) {
    postOptions.type = types.template;
    return handleFavorites(postOptions, callback);
  };

  var addWorkspaceToFavorites = function(postOptions, callback) {
    postOptions.type = types.workspace;
    return handleFavorites(postOptions, callback);
  };

  var removeFavorite = function(deleteOptions, callback) {
    optionsToSend.url = optionsToSend.url + deleteOptions.type + '/' + (deleteOptions.id || deleteOptions.objectId || '');
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var removeSheetFromFavorites = function(deleteOptions, callback) {
    deleteOptions.type = types.sheet;
    return removeFavorite(deleteOptions, callback);
  };

  var removeFolderFromFavorites = function(deleteOptions, callback) {
    deleteOptions.type = types.folder;
    return removeFavorite(deleteOptions, callback);
  };

  var removeReportFromFavorites = function(deleteOptions, callback) {
    deleteOptions.type = types.report;
    return removeFavorite(deleteOptions, callback);
  };

  var removeTemplateFromFavorites = function(deleteOptions, callback) {
    deleteOptions.type = types.template;
    return removeFavorite(deleteOptions, callback);
  };

  var removeWorkspaceFromFavorites = function(deleteOptions, callback) {
    deleteOptions.type = types.workspace;
    return removeFavorite(deleteOptions, callback);
  };

  return {
    listFavorites : listFavorites,
    addItemsToFavorites : addItemsToFavorites,
    addSheetToFavorites : addSheetToFavorites,
    addFolderToFavorites: addFolderToFavorites,
    addReportToFavorites: addReportToFavorites,
    addTemplateToFavorites : addTemplateToFavorites,
    addWorkspaceToFavorites : addWorkspaceToFavorites,
    removeSheetFromFavorites : removeSheetFromFavorites,
    removeFolderFromFavorites : removeFolderFromFavorites,
    removeReportFromFavorites : removeReportFromFavorites,
    removeTemplateFromFavorites : removeTemplateFromFavorites,
    removeWorkspaceFromFavorites : removeWorkspaceFromFavorites,
    //convenience methods to remove multiples.
    //Uses the same as the singular remove methods.
    removeSheetsFromFavorites : removeSheetFromFavorites,
    removeFoldersFromFavorites : removeFolderFromFavorites,
    removeReportsFromFavorites : removeReportFromFavorites,
    removeTemplatesFromFavorites : removeTemplateFromFavorites,
    removeWorkspacesFromFavorites : removeWorkspaceFromFavorites
  };
};
