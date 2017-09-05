var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));
var constants = require('./constants.js');

exports.create = function(requestorConfig) {
  var buildHeaders = function(options) {
    var headers = {
      Accept: options.accept || 'application/json',
      'Content-Type': options.contentType || 'application/json',
      'User-Agent': 'smartsheet-javascript-sdk'
    };
    if(options.accessToken) {
      headers.Authorization = 'Bearer ' + options.accessToken;
    }
    if (options.fileName) {
      headers['Content-Disposition'] = 'attachment; filename="'+options.fileName +'"';
      headers['Content-Length'] = options.fileSize;
    }
    return headers;
  };

  var buildUrl = function(options) {
    var baseUrl = process.env.SMARTSHEET_API_HOST || 'https://api.smartsheet.com/';
    if (options.id) {
      return baseUrl + options.url + options.id;
    } else {
      return baseUrl + (options.url || '');
    }
  };

  var handleResponse = function(response, body) {
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
  };

  var get = function(options, callback) {
    var requestOptions = {
      url: buildUrl(options),
      headers: buildHeaders(options),
      qs: options.queryParameters
    };
    
    return makeRequestWithRetries(requestOptions, request.getAsync, callback, options);
  };

  var post = function(options, callback) {
    var requestOptions = {
      url: buildUrl(options),
      headers: buildHeaders(options),
      qs: options.queryParameters,
      body: JSON.stringify(options.body)
    };

    return makeRequestWithRetries(requestOptions, request.postAsync, callback, options);
  };

  var postFile = function(options, callback) {
    var requestOptions = {
      url: buildUrl(options),
      headers: buildHeaders(options),
      qs: options.queryParameters,
      body: options.fileStream
    };

    return makeRequestWithRetries(requestOptions, request.postAsync, callback, options);
  };

  var deleteFunc = function(options, callback) {
    var requestOptions = {
      url: buildUrl(options),
      headers: buildHeaders(options),
      qs: options.queryParameters
    };

    return makeRequestWithRetries(requestOptions, request.delAsync, callback, options);
  };

  var put = (options, callback) => {
    var requestOptions = {
      url: buildUrl(options),
      headers: buildHeaders(options),
      qs: options.queryParameters,
      body: JSON.stringify(options.body)
    };

    return makeRequestWithRetries(requestOptions, request.putAsync, callback, options);
  };

  var makeRequestWithRetries = function(requestOptions, requestMethod, callback, options) {
    var maxRetryTime = options.maxRetryTime || requestorConfig.maxRetryTime || constants.maxRetryTime;
    var calcBackoff = options.calcRetryBackoff || requestorConfig.calcRetryBackoff || defaultCalcBackoff;

    var endRetryTime = Date.now() + maxRetryTime;

    return retryHelper(requestOptions, requestMethod, endRetryTime, calcBackoff, 0)
      .nodeify(callback);
  }

  var defaultCalcBackoff = numRetries =>
    (Math.pow(2, numRetries) + Math.random()) * 1000;

  var retryHelper = function(requestOptions, requestMethod, endRetryTime, calcBackoff, numRetries) {
    return makeRequest(requestOptions, requestMethod)
      .catch(retryWithBackoffHelper(requestOptions, requestMethod, endRetryTime, calcBackoff, numRetries));
  }

  var makeRequest = (requestOptions, requestMethod) =>
    requestMethod(requestOptions)
      .catch(error => new Promise.reject(error))
      .spread((response, body) => handleResponse(response, body));

  var retryWithBackoffHelper = function(requestOptions, requestMethod, endRetryTime, calcBackoff, numRetries) {
      return error => {
        var backoffMillis = calcBackoff(numRetries);

        if (!shouldRetry(error) || Date.now() + backoffMillis >= endRetryTime) {
          return new Promise.reject(error);
        }

        // var backoffInSeconds = (backoffMillis / 1000).toFixed(1);
        // console.log('HttpError status_code=' + error.statusCode + ': Retrying in ' + backoffInSeconds + ' seconds');

        return Promise.delay(backoffMillis)
          .then(() =>
           retryHelper(requestOptions, requestMethod, endRetryTime, calcBackoff, numRetries + 1));
      };
  }

  var shouldRetry = error =>
    error.errorCode === 4001 ||
    error.errorCode === 4002 ||
    error.errorCode === 4003 ||
    error.errorCode === 4004;

  return {
    handleResponse: handleResponse,
    get: get,
    put: put,
    post: post,
    postFile: postFile,
    delete: deleteFunc,
    internal: {
      buildHeaders: buildHeaders,
      buildUrl: buildUrl
    }
  };
};
