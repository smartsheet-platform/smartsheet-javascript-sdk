var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));

var buildHeaders = function(options) {
  var headers = {
    'Authorization' : 'Bearer ' + options.accessToken,
    'Accept': options.accept || 'application/json',
    'Content-Type': options.contentType || 'application/json',
    'User-Agent': 'smartsheet-javascript-sdk'
  };
  if (options.fileName) {
    headers['Content-Disposition'] = 'attachment; filename="'+options.fileName +'"';
    headers['Content-Length'] = options.fileSize;
  }
  return headers;
};

exports.handleResponse = function(response, body) {
  if (response.statusCode != 200) {
    var errorResponse = {
      statusCode: response.statusCode
    };
    if (response.headers['content-type'] === 'application/json;charset=UTF-8') {
      var responseBody = JSON.parse(body);
      errorResponse.errorCode = responseBody.errorCode;
      errorResponse.message = responseBody.message;
    } else {
      errorResponse.message = body;
    }
    return new Promise.reject(errorResponse);
  } else if (response.headers['content-type'] === 'application/json;charset=UTF-8') {
    return JSON.parse(body);
  } else {
    return body;
  }
};

var buildUrl = function(options) {
  var baseUrl = process.env.SMARTSHEET_API_HOST || 'https://api.smartsheet.com/';
  if (options.id) {
    return baseUrl + options.url + options.id;
  } else {
    return baseUrl + (options.url || '');
  }
};

exports.get = function(options, callback) {
  var requestOptions = {
    url: buildUrl(options),
    headers: buildHeaders(options),
    qs: options.queryParameters
  };
  
  return makeRequestWithRetries(requestOptions, request.getAsync, callback, options);
};

exports.post = function(options, callback) {
  var requestOptions = {
    url: buildUrl(options),
    headers: buildHeaders(options),
    qs: options.queryParameters,
    body: JSON.stringify(options.body)
  };

  return makeRequestWithRetries(requestOptions, request.postAsync, callback, options);
};

exports.postFile = function(options, callback) {
  var requestOptions = {
    url: buildUrl(options),
    headers: buildHeaders(options),
    qs: options.queryParameters,
    body: options.fileStream
  };

  return makeRequestWithRetries(requestOptions, request.postAsync, callback, options);
};

exports.delete = function(options, callback) {
  var requestOptions = {
    url: buildUrl(options),
    headers: buildHeaders(options),
    qs: options.queryParameters
  };

  return makeRequestWithRetries(requestOptions, request.delAsync, callback, options);
};

exports.put = function(options, callback) {
  var requestOptions = {
    url: buildUrl(options),
    headers: buildHeaders(options),
    qs: options.queryParameters,
    body: JSON.stringify(options.body)
  };

  return makeRequestWithRetries(requestOptions, request.putAsync, callback, options);
};

function makeRequestWithRetries(requestOptions, requestMethod, callback, options) {
  var endRetryTime = Date.now() + options.maxRetryTime;
  var calcBackoff = options.calcRetryBackoff || defaultCalcBackoff;

  return _retryHelper(requestOptions, requestMethod, endRetryTime, calcBackoff, 0)
    .nodeify(callback);
}

function _retryHelper(requestOptions, requestMethod, endRetryTime, calcBackoff, numRetries) {
  return makeRequest(requestOptions, requestMethod)
    .catch(retryWithBackoff(requestOptions, requestMethod, endRetryTime, calcBackoff, numRetries));
}

function retryWithBackoff(requestOptions, requestMethod, endRetryTime, calcBackoff, numRetries) {
    return function (error) {
      if (!shouldRetry(error) || Date.now() + calcBackoff(numRetries) > endRetryTime) {
        return new Promise.reject(error);
      }

      var backoffInSeconds = (calcBackoff(numRetries) / 1000).toFixed(1);
      console.log('HttpError status_code=' + error.statusCode + ': Retrying in ' + backoffInSeconds + ' seconds');

      return Promise.delay(calcBackoff(numRetries))
        .then(function () {
          return _retryHelper(requestOptions, requestMethod, endRetryTime, calcBackoff, numRetries + 1);
        });
    };
}

function shouldRetry(error) {
  return error.errorCode === 4001 ||
    error.errorCode === 4002 ||
    error.errorCode === 4003 ||
    error.errorCode === 4004;
}

function defaultCalcBackoff(numRetries) {
  return (Math.pow(2, numRetries) + Math.random()) * 1000;
}

function makeRequestWithCallback (requestOptions, requestMethod, callback) {
  return makeRequest(requestOptions, requestMethod)
    .nodeify(callback);
}

function makeRequest (requestOptions, requestMethod) {
  return requestMethod(requestOptions)
  .catch(function(error) {
    return new Promise.reject(error);
  })
  .spread(function(response, body) {
    return exports.handleResponse(response, body);
  });
}

var internal = exports.internal = {};
internal.buildHeaders = buildHeaders;
internal.buildUrl = buildUrl;
