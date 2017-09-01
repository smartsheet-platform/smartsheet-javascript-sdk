var utils = require('../utils/httpUtils.js');
var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function(options) {
    var optionsToSend = {
        url: options.apiUrls.contacts,
        accessToken : options.accessToken,
        maxRetryTime : options.maxRetryTime,
        calcRetryBackoff: options.calcRetryBackoff
    };

    var getContact = function(getOptions, callback) {
        return utils.get(_.extend(optionsToSend, getOptions), callback);
    };

    var buildContactObject = function() {
        var contactObject = {
            getContact : getContact,
            listContacts : getContact
        };
        return contactObject;
    };

    return buildContactObject();
};