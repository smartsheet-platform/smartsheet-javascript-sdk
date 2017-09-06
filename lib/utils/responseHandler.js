var Promise = require("bluebird");

module.exports = {
  handleResponse: function(response, body) {
    if (response.statusCode != 200) {
      var errorResponse = {
        statusCode: response.statusCode
      };
      if (response.headers['content-type'] === 'application/json;charset=UTF-8') {
        var responseBody = JSON.parse(body);
        errorResponse.errorCode = responseBody.errorCode;
        errorResponse.message = responseBody.message;
        errorResponse.refId = responseBody.refId;
      } else {
        errorResponse.message = body;
      }
      return new Promise.reject(errorResponse);
    } else if (response.headers['content-type'] === 'application/json;charset=UTF-8') {
      return JSON.parse(body);
    } else {
      return body;
    }
  }
};
