var Promise = require("bluebird");

module.exports = (response, body) => {
  var outResponse = {
    statusCode: response.statusCode,
    headers: response.headers,
    body: body
  };

  if (response.statusCode != 200) {
    var errorResponse = outResponse;
    if (response.headers['content-type'] === 'application/json;charset=UTF-8') {
      var responseBody = JSON.parse(body);
      errorResponse.errorCode = responseBody.errorCode;
      errorResponse.message = responseBody.message;
      errorResponse.refId = responseBody.refId;
      
      if (responseBody.detail !== undefined) {
        errorResponse.detail = responseBody.detail;
      }
    } else {
      errorResponse.message = body;
    }

    return new Promise.reject(errorResponse);
  } else if (response.headers['content-type'] === 'application/json;charset=UTF-8') {
    outResponse.content = JSON.parse(body);
    return outResponse;
  } else {
    outResponse.content = body;
    return outResponse;
  }
};
