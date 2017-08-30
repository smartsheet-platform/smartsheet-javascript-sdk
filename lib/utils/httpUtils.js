var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
Promise.promisifyAll(request);

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
    method: 'GET',
    url: buildUrl(options),
    headers: buildHeaders(options),
    qs: options.queryParameters
  };
  
  return makeRequest(requestOptions, callback);
};

exports.post = function(options, callback) {
  var requestOptions = {
    method: 'POST',
    url: buildUrl(options),
    headers: buildHeaders(options),
    qs: options.queryParameters,
    body: JSON.stringify(options.body)
  };

  return makeRequest(requestOptions, callback)
};

exports.postFile = function(options, callback) {
  var requestOptions = {
    method: 'POST',
    url: buildUrl(options),
    headers: buildHeaders(options),
    qs: options.queryParameters,
    body: options.fileStream
  };

  return makeRequest(requestOptions, callback);
};

exports.delete = function(options, callback) {
  var requestOptions = {
    method: 'DELETE',
    url: buildUrl(options),
    headers: buildHeaders(options),
    qs: options.queryParameters
  };

  return makeRequest(requestOptions, callback);
};

exports.put = function(options, callback) {
  var requestOptions = {
    method: 'PUT',
    url: buildUrl(options),
    headers: buildHeaders(options),
    qs: options.queryParameters,
    body: JSON.stringify(options.body)
  };

  return makeRequest(requestOptions, callback);
};

function makeRequest (requestOptions, callback) {
  return request(requestOptions)
  .catch(function(error) {
    return new Promise.reject(error);
  })
  .spread(function(response, body) {
    return exports.handleResponse(response, body);
  })
  .nodeify(callback);
}

var internal = exports.internal = {};
internal.buildHeaders = buildHeaders;
internal.buildUrl = buildUrl;
