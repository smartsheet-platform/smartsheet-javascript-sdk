var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants');
var Promise = require('bluebird');


exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.favorites,
    urls : options.apiUrls,
    accessToken : options.accessToken
  };

  var getFavorites = function(getOptions, callback) {
    return utils.get(_.extend(optionsToSend, getOptions), callback);
  };

  var createFavorite = function(postOptions, callback) {
    return utils.post(_.extend(optionsToSend, postOptions), callback);
  };

  //TODO: How to handle bulk deletes
  var deleteFavorite = function(deleteOptions, callback) {
    return utils.delete(_.extend(optionsToSend, deleteOptions), callback);
  };

  var deleteFavoriteSheet = function(deleteOptions, callback) {
    return deleteFavorite(_.extend(deleteOptions, {type: constants.types.sheet}), callback);
  };

  var deleteFavoriteWorkspace = function(deleteOptions, callback) {
    return deleteFavorite(_.extend(deleteOptions, {type: constants.types.workspace}), callback);
  };

  var deleteFavoriteFolder = function(deleteOptions, callback) {
    return deleteFavorite(_.extend(deleteOptions, {type: constants.types.folder}), callback);
  };

  var deleteFavoriteReport = function(deleteOptions, callback) {
    return deleteFavorite(_.extend(deleteOptions, {type: constants.types.report}), callback);
  };

  var deleteFavoriteTemplate = function(deleteOptions, callback) {
    return deleteFavorite(_.extend(deleteOptions, {type: constants.types.template}), callback);
  };

  return {
    createFavorite : createFavorite,
    getFavorites : getFavorites,
    deleteFavoriteSheet : deleteFavoriteSheet,
    deleteFavoriteFolder : deleteFavoriteFolder,
    deleteFavoriteReport : deleteFavoriteReport,
    deleteFavoriteTemplate : deleteFavoriteTemplate,
    deleteFavoriteWorkspace : deleteFavoriteWorkspace
  };
};
