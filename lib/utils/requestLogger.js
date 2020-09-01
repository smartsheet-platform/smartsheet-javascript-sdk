var _ = require('underscore');

exports.create = function(logger) {
  const PAYLOAD_PREVIEW_LENGTH = 1024;
  const EXPOSED_CENSOR_CHARS = 4;

  var logRequest = (verb, requestOptions) => {
    logRequestBasics('info', verb, requestOptions);
    logHeaders('Request', requestOptions.headers);
    logPreviewAndFullPayload('Request', requestOptions.body);
  };

  var logRetryAttempt = (verb, requestOptions, error, attemptNum) => {
    logger.warn('Request failed, performing retry #%d\nCause: ', attemptNum, error);
    logRequestBasics('warn', verb, requestOptions);
  };
  
  var logRetryFailure = (verb, requestOptions, attemptNum) => {
    logger.error('Request failed after %d retries', attemptNum);
  };
  
  var logSuccessfulResponse = response => {
    logger.info('Response: Success (HTTP %d)', response.statusCode);
    logHeaders('Response', response.headers);
    logResponsePayload('Response', response.content);
  };

  var logErrorResponse = (verb, requestOptions, error) => {
    logRequestBasics('error', verb, requestOptions);
    logger.error(
      'Response: Failure (HTTP %d)\n\tError Code: %d - %s\n\tRef ID: %s',
      error.statusCode, error.errorCode, error.message, error.refId);
    logHeaders('Response', error.headers);
  };

  var log = logger.log;

  var logRequestBasics = (level, verb, requestOptions) => {
    var url = buildLoggingUrl(requestOptions);

    logger.log(level, '%s %s', verb, url);
  };

  var logHeaders = (context, headers) => {
    if(_.isEmpty(headers)) return;

    logger.silly('%s Headers: %s', context, JSON.stringify(censorHeaders(headers)));
  };

  var logResponsePayload = (context, payload) => {
    if(_.isEmpty(payload)) return;

    var censoredPayload = censorPayload(payload);
    var payloadStr = JSON.stringify(censoredPayload);
    logPreviewAndFullPayload(context, payloadStr);
  };

  var logPreviewAndFullPayload = (context, payloadStr) => {
    if(_.isEmpty(payloadStr)) return;

    var preview = payloadStr;
    if(typeof preview === 'string' && preview.length > PAYLOAD_PREVIEW_LENGTH) {
      preview = preview.substring(0, PAYLOAD_PREVIEW_LENGTH) + '...';
    }

    logger.verbose('%s Payload (preview): %s', context, preview);
    logger.debug('%s Payload (full): %s', context, payloadStr);
  };

  // Formatting Utilities

  var buildLoggingUrl = requestOptions => {
    var queryParams = '';
    var qs = requestOptions.qs;
    if(!_.isEmpty(qs)) {
      qs = censorQueryParams(qs);

      queryParams =
        '?' +
        (_.pairs(qs)
          .map((pair) => `${encodeURIComponent(pair[0])}=${encodeURIComponent(pair[1])}`)
          .join('&'));
    }
    return requestOptions.url + queryParams;
  };
  
  var censor = s => {
    if(_.isEmpty(s)) return s;

    var censoredSection = '*'.repeat(Math.max(s.length - EXPOSED_CENSOR_CHARS, 0));
    var exposedSection = s.slice(-EXPOSED_CENSOR_CHARS);
    return censoredSection + exposedSection;
  };
  
  var buildCensor = function(blacklist) {
    return obj => _.mapObject(obj, (val, key) => {
      var keyMatch = key.toLowerCase();
      return (blacklist.indexOf(keyMatch) != -1) // Found in censor blacklist
        ? censor(val)
        : val;
    });
  };

  const queryParamBlacklist = ['code', 'client_id', 'hash', 'refresh_token'].sort();
  var censorQueryParams = buildCensor(queryParamBlacklist);

  var headerBlacklist = ['authorization'].sort();
  var censorHeaders = buildCensor(headerBlacklist);

  var payloadBlacklist = ['access_token', 'refresh_token'].sort();
  var censorPayload = buildCensor(payloadBlacklist);

  // Logger final configuration

  var formatLog = (level, msg, meta) => {
    var timestamp = new Date().toISOString();
    var displayLevel = padStart(level.toUpperCase(), 7);
    
    return `${timestamp}[${displayLevel}] ${msg}`;
  };

  var padStart = (str, maxLength) => {
      if (str.length >= maxLength) return str;
  
      var timesToRepeat = maxLength - str.length;
      return ' '.repeat(timesToRepeat) + str;
  };

  if(logger.filters) {
    logger.filters.push(formatLog);
  }

  // Generated object

  return {
    logRequest: logRequest,
    logRetryAttempt: logRetryAttempt,
    logRetryFailure: logRetryFailure,
    logSuccessfulResponse: logSuccessfulResponse,
    logErrorResponse: logErrorResponse,
    log: log
  };
};

const doNothing = () => {};
exports.empty = {
  logRequest: doNothing,
  logRetryAttempt: doNothing,
  logRetryFailure: doNothing,
  logSuccessfulResponse: doNothing,
  logErrorResponse: doNothing,
  log: doNothing
};
