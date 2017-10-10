var Promise = require('bluebird');
var _ = require('underscore');
var constants = require('./constants.js');
var requestLogger = require('./requestLogger');
var packageJson = require('../../package.json');

exports.create = function(requestorConfig) {
  var logger = requestorConfig.logger
    ? requestLogger.create(requestorConfig.logger)
    : requestLogger.empty;

  var request = requestorConfig.request ||
                Promise.promisifyAll(require("request"), {multiArgs: true});

  var handleResponse = requestorConfig.handleResponse ||
                       require('./responseHandler');

  var defaultCalcBackoff = numRetries => (Math.pow(2, numRetries) + Math.random()) * 1000;
  var defaultRetryOptions = {
    maxRetryDurationMillis: requestorConfig.maxRetryDurationMillis ||
                            constants.maxRetryDurationMillis,
    calcRetryBackoff: requestorConfig.calcRetryBackoff || defaultCalcBackoff
  };

  var buildHeaders = options => {
    var headers = {
      Accept: options.accept || 'application/json',
      'Content-Type': options.contentType || 'application/json',
      'User-Agent': `smartsheet-javascript-sdk/${packageJson.version}`
    };
    if(options.accessToken) {
      headers.Authorization = 'Bearer ' + options.accessToken;
    }
    if(options.assumeUser) {
      headers['Assume-User'] = encodeURIComponent(options.assumeUser);
    }
    if (options.fileName) {
      headers['Content-Disposition'] = `attachment; filename="${options.fileName}"`;
      headers['Content-Length'] = options.fileSize;
    }
    return headers;
  };

  var buildUrl = options => {
    var baseUrl = process.env.SMARTSHEET_API_HOST || 'https://api.smartsheet.com/';
    if (options.id) {
      return baseUrl + options.url + options.id;
    } else {
      return baseUrl + (options.url || '');
    }
  };

  var get = (options, callback) =>
    methodRequest(options, request.getAsync, 'GET', callback);

  var post = (options, callback) => {
    var requestExtension = { body: JSON.stringify(options.body) };
    
    return methodRequest(options, request.postAsync, 'POST', callback, requestExtension);
  };

  var postFile = (options, callback) => {
    var requestExtension = { body: options.fileStream };

    return methodRequest(options, request.postAsync, 'POST', callback, requestExtension);
  };

  var deleteFunc = (options, callback)  =>
    methodRequest(options, request.delAsync, 'DELETE', callback);

  var put = (options, callback) => {
    var requestExtension = { body: JSON.stringify(options.body) };
    
    return methodRequest(options, request.putAsync, 'PUT', callback, requestExtension);
  };

  var methodRequest = (options, method, methodName, callback, requestExtension) => {
    var baseRequestOptions = {
      url: buildUrl(options),
      headers: buildHeaders(options),
      qs: options.queryParameters,
      encoding: options.encoding
    };
    var requestOptions = _.extend(baseRequestOptions, requestExtension);

    var retryOptions = _.pick(options, 'maxRetryDurationMillis', 'calcRetryBackoff');

    logger.logRequest(methodName, requestOptions);

    return makeRequestWithRetries(method, methodName, requestOptions, retryOptions, callback);
  };

  var makeRequestWithRetries = (method, methodName, requestOptions, retryOptions, callback) => {
    var effectiveRetryOptions = _.defaults(retryOptions, defaultRetryOptions);

    effectiveRetryOptions.endRetryTime = Date.now() + effectiveRetryOptions.maxRetryDurationMillis;

    return retryHelper(method, methodName, requestOptions, effectiveRetryOptions, 0)
      .tap(logger.logSuccessfulResponse)
      .tapCatch(error => logger.logErrorResponse(methodName, requestOptions, error))
      .get('content')
      .catch(error => Promise.reject(_.omit(error, 'headers', 'body')))
      .nodeify(callback);
  };

  var retryHelper = (method, methodName, requestOptions, retryOptions, numRetries) =>
    makeRequest(method, methodName, requestOptions)
      .catch(retryWithBackoffHelper(method, methodName, requestOptions, retryOptions, numRetries));

  var makeRequest = (method, methodName, requestOptions) =>
    method(requestOptions).spread(handleResponse);

  var retryWithBackoffHelper = (method, methodName, requestOptions, retryOptions, numRetries) => {
    return error => {
      var backoffMillis = retryOptions.calcRetryBackoff(numRetries, error);

      var shouldExitRetry =
        !shouldRetry(error) ||
        backoffMillis < 0 ||
        Date.now() + backoffMillis >= retryOptions.endRetryTime;

      if (shouldExitRetry) {
        logger.logRetryFailure(methodName, requestOptions, numRetries);
        return new Promise.reject(error);
      }

      var nextRetry = numRetries + 1;
      logger.logRetryAttempt(methodName, requestOptions, error, nextRetry);
      return Promise.delay(backoffMillis)
        .then(() => retryHelper(method, methodName, requestOptions, retryOptions, nextRetry));
    };
  };

  var shouldRetry = error =>
    error.errorCode === 4001 ||
    error.errorCode === 4002 ||
    error.errorCode === 4003 ||
    error.errorCode === 4004;

  return {
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
