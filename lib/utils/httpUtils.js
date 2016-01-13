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
  var baseUrl = process.env.HOST || 'https://api.smartsheet.com/';
  if (options.id) {
    return baseUrl + options.url + options.id;
  } else {
    return baseUrl + (options.url || '');
  }
};

exports.get = function(options, callback) {
  var header = buildHeaders(options);
  var url = buildUrl(options);
  //console.log(header, url);
  return request.getAsync({
    url:url,
    qs:options.queryParameters,
    headers:header
  })
  .catch(function(error) {
    return new Promise.reject(error);
  })
  .spread(function(response, body) {
    return exports.handleResponse(response, body);
  }).nodeify(callback);
};

exports.post = function(options, callback) {
  var header = buildHeaders(options);
  var url = buildUrl(options);
   //console.log(header, url, options.body);
  return request.postAsync({
    url:url,
    headers:header,
    qs:options.queryParameters,
    body:JSON.stringify(options.body)
  })
  .catch(function(error) {
    return new Promise.reject(error);
  })
  .spread(function(response, body) {
    return exports.handleResponse(response, body);
  }).nodeify(callback);
};

exports.delete = function(options, callback) {
  var headers = buildHeaders(options);
  var url = buildUrl(options);
  var requestOptions = {
    url:url,
    qs:options.queryParameters,
    headers:headers
  };
  return request.delAsync(requestOptions)
  .catch(function(error) {
    return new Promise.reject(error);
  })
  .spread(function(response, body) {
    return exports.handleResponse(response, body);
  }).nodeify(callback);
};

exports.put = function(options, callback) {
  var headers = buildHeaders(options);
  return request.putAsync({
    url:buildUrl(options),
    headers:headers,
    qs:options.queryParameters,
    body:JSON.stringify(options.body)
  })
  .catch(function(error) {
    return new Promise.reject(error);
  })
  .spread(function(response, body) {
    return exports.handleResponse(response, body);
  }).nodeify(callback);
};

var internal = exports.internal = {};
internal.buildHeaders = buildHeaders;
internal.buildUrl = buildUrl;
