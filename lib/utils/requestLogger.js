var _ = require('underscore');

exports.create = function(logger) {
  const PAYLOAD_PREVIEW_LENGTH = 1024;
  const EXPOSED_CENSOR_CHARS = 4;

  var logRequest = (verb, requestOptions) => {
    logRequestBasics('info', verb, requestOptions);
    logHeaders(requestOptions.headers);
    logPayload(requestOptions.body); //TODO: Restrict payload rendering MIME types
  };

  var logRetryAttempt = (verb, requestOptions, error, attemptNum) => {
    logger.warn('Request failed, performing retry #%d\nCause: ', attemptNum, error);
    logRequestBasics('warn', verb, requestOptions);
  };
  
  var logRetryFailure = (verb, requestOptions, error, attemptNum) => {
    logger.error('Request failed after %d retries\nCause: ', attemptNum, error);
  };
  
  var logSuccessfulResponse = response => {
    logger.info('Response: Success (HTTP %d)', response.statusCode);
    logHeaders(response.headers);
    logPayload(response.body);
  };

  var logErrorResponse = (verb, requestOptions, error) => {
    logRequestBasics('error', verb, requestOptions);
    var {statusCode, errorCode, message, refId} = error;
    logger.error(
      'Response: Failure (HTTP %d)\n\tError Code: %d - %s\n\tRef ID: %s',
      statusCode, errorCode, message, refId);
    logHeaders(error.headers);
    logPayload(error.body); //TODO: Censor token results
  };

  var log = (...params) => logger.log(...params);

  var logRequestBasics = (level, verb, requestOptions) => {
    var url = buildLoggingUrl(requestOptions);

    logger.log(level, '%s %s', verb, url);
  };

  var logHeaders = headers => {
    if(_.isEmpty(headers)) return;

    logger.silly('Headers: ', headers);
  };

  var logPayload = payload => {
    if(_.isEmpty(payload)) return;

    var preview = payload;
    if(preview.length > PAYLOAD_PREVIEW_LENGTH) {
      preview = payload.substring(0, PAYLOAD_PREVIEW_LENGTH) + '...';
    }

    logger.verbose('Payload (preview): %s', preview);
    logger.debug('Payload (full): %s', payload);
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
          .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
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

  // Logger final configuration

  var formatLog = (level, msg, meta) => {
    var timestamp = new Date().toISOString();
    var displayLevel = padStart(level.toUpperCase(), 7);
    
    return `${timestamp}[${displayLevel}] ${msg}`;
  };

  var padStart = (str, maxLength) => {
      if (str.length >= maxLength) return str;
  
      let timesToRepeat = maxLength - str.length;
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
