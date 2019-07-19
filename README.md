# Smartsheet SDK for JavaScript [![Build Status](https://travis-ci.org/smartsheet-platform/smartsheet-javascript-sdk.svg?branch=master)](https://travis-ci.org/smartsheet-platform/smartsheet-javascript-sdk) [![Coverage Status](https://coveralls.io/repos/github/smartsheet-platform/smartsheet-javascript-sdk/badge.svg?branch=master)](https://coveralls.io/github/smartsheet-platform/smartsheet-javascript-sdk?branch=master) [![npm version](https://badge.fury.io/js/smartsheet.svg)](https://badge.fury.io/js/smartsheet)

This is a client SDK to simplify connecting to the [Smartsheet API](http://www.smartsheet.com/developers/api-documentation) from Node.js applications.

## System Requirements

The SDK supports Node.js versions 6.x or later.

## Installation

To install this SDK, simply run the following command in a terminal window:

```bash
npm install smartsheet
```

## Documentation

The Smartsheet API documentation with corresponding SDK example code can be found [here](http://www.smartsheet.com/developers/api-documentation).

## Example Usage

To call the API, you must have an access token, which looks something like this example: ll352u9jujauoqz4gstvsae05. You can find the access token in the Smartsheet UI at Account > Personal Settings > API Access.

The following is a brief sample using promises that shows you how to:

* Initialize the client
* List all sheets
* Load one sheet

```javascript
// Initialize the client
var client = require('smartsheet');
var smartsheet = client.createClient({
  accessToken: 'll352u9jujauoqz4gstvsae05',
  logLevel: 'info'
});

// The `smartsheet` variable now contains access to all of the APIs

// Set queryParameters for `include` and pagination
var options = {
  queryParameters: {
    include: "attachments",
    includeAll: true
  }
};

// List all sheets
smartsheet.sheets.listSheets(options)
  .then(function (result) {
    var sheetId = result.data[0].id;                // Choose the first sheet

    // Load one sheet
    smartsheet.sheets.getSheet({id: sheetId})
      .then(function(sheetInfo) {
        console.log(sheetInfo);
      })
      .catch(function(error) {
        console.log(error);
      });
  })
  .catch(function(error) {
    console.log(error);
  });
```

Although the example above is using promises and the API documentation samples use promises, you could also access the APIs in this SDK by using callbacks.

```javascript
// List all sheets using callbacks
smartsheet.sheets.listSheets({}, function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});
```

 See the [node-read-write-sheet](https://github.com/smartsheet-samples/node-read-write-sheet) project for a code example that shows how to call methods to read and write to a sheet using this SDK.

## Conventions

Each endpoint takes two arguments: a set of options, and an optional callback function. If the callback is not specified, the SDK will return a promise instead.

The options argument is an object that contains any number of parameters specific to the endpoint, and may optionally require a `body` field that will be placed in the body of the request when applicable.

Each endpoint also permits an optional parameter in the options object:

* `queryParameters` - This option is common for specifying enhancements or additional features for an API call. It specifies the query string for the call's URL.

  This must be an object mapping URL query string fields to their values. For example, to make a call with the query string `?include=comments&includeAll=true`, an API call would look like the following:

  ```javascript
  ...getSheet({
    ...
    queryParameters: {include: 'comments', includeAll: true});
  ```

## Basic Configuration

When creating the client object, pass an object with any of the following properties to tune its behavior.

* `maxRetryDurationSeconds` - The maximum time in seconds to retry intermittent errors. (Defaults to 15 seconds.)

* `logLevel` - Set to `'info'` to log each call and return value to the console.


## Advanced Configuration Options
### Logging Configuration


This library leverages [**winston**](https://github.com/winstonjs/winston) for logging.

Supported log levels are:

|Level|What is logged|
|---|---|
|`'error'`|Failures only|
|`'warn'`|Failures and retries|
|`'info'`|Each call URL and response code|
|`'verbose'`|Payloads, truncated to 1024 characters|
|`'debug'`|Full payloads|
|`'silly'`|Full payloads and HTTP headers|

You may create your own **winston** container or configure the default `winston.loggers` container, adding a logger named 'smartsheet'. Specify this container using the configuration option `loggerContainer`. ([winston documentation on configuring loggers](https://github.com/winstonjs/winston#working-with-multiple-loggers-in-winston).)

If you want to use your own logger, pass a logger object as the configuration option `logger` that implements the following methods:
* `silly`, `verbose`, `debug`, `info`, `warn`, `error` - Standard logging methods
* `log` - Similar to the above, but accepting the logging level string as its initial parameter; the log level is guaranteed be one of the above options.

### Retry Configuration
For additional customization, you can specify a `calcRetryBackoff` function.  This function is called with two arguments:

* The first accepts the index of the retry being attempted (0 for the first retry, 1 for the second, etc.)
* The second accepts the Error Object that caused the retry.

The function must return the number of milliseconds to wait before making the subsequent retry call, or a negative number if no more retries should be made.

The default implementation performs exponential backoff with jitter.

### Base URL Configuration
The SDK can be directed to point at a different base URL, which can be helpful for testing against mock APIs or connecting to specialized Smartsheet environments.

When creating the Smartsheet client, set the base URL by passing it into the constructor arguments:

```javascript
var smartsheet = require('smartsheet').createClient({
  baseUrl: smartsheet.smartSheetURIs.defaultBaseURI
});
```

#### Working With Smartsheetgov.com Accounts
If you need to access Smartsheetgov you will need to specify the Smartsheetgov API URI as the `baseUrl` during creation of the Smartsheet client object. SmartsheetGov uses a base URI of `https://api.smartsheetgov.com/2.0/`. The Smartsheetgov URI is defined as a constant (`smartSheetURIs.govBaseURI`).

Invoke the SmartsheetBuilder with the base URI pointing to Smartsheetgov:
```javascript
var smartsheet = require('smartsheet').createClient({
  baseUrl: smartsheet.smartSheetURIs.govBaseURI
});
```

## Testing

The source code comes with several scripts for running tests:

|Script|Action|
|---|---|
|`npm run test`|Runs all tests. Note, the mock API tests will fail unless the mock server is running|
|`npm run test-functional`|Runs only functional tests|
|`npm run test-mock-api`|Runs only mock API tests. Clone the [Smartsheet SDK tests](https://github.com/smartsheet-platform/smartsheet-sdk-tests) repo and follow the instructions from the README to start the mock server|
|`npm run coverage`|Runs functional tests and reports on code coverage|
|`gulp jshint`|Runs JSHint against the codebase|
|`gulp [watch]`|Watches the codebase and runs JSHint whenever changes are made|

Note that a successful test run will currently output some unhandled rejection messages in the body of the logs. This is expected, and does not indicate test failure.

## Passthrough Option

If there is an API Feature that is not yet supported by the JavaScript SDK, there is a passthrough option that allows you to call arbitrary API endpoints. Passthrough calls support error retry and logging.

To invoke the passthrough, your code can call one of the following methods:

`response = smartsheet.request.get(getOptions, callback)`

`response = smartsheet.request.post(postOptions, callback)`

`response = smartsheet.request.postFile(postOptions, callback)`

`response = smartsheet.request.put(putOptions, callback)`

`response = smartsheet.request.deleteRequest(deleteOptions, callback)`

The `...Options` parameter takes the normal set of parameters taken by other similar SDK calls, but also requires a `url` parameter that tells it the relative path of the endpoint to call.

### Passthrough Example

The following example shows how to POST data to `https://api.smartsheet.com/2.0/sheets` using the passthrough method:

```javascript
var payload = {
  name: 'my new sheet',
  columns: [
    {
      title: 'Favorite',
      type: 'CHECKBOX',
      symbol: 'STAR'
    },
    {
      title: 'Primary Column',
      primary: true,
      type: 'TEXT_NUMBER'
    }
  ]
};

var responsePromise = smartsheet.request.post({
  url: 'sheets',
  body: payload
});
```

## Advanced Topics
For details about more advanced features, see [Advanced Topics](ADVANCED.md).

## Contributing

If you would like to contribute a change to the SDK, please fork a branch and then submit a pull request.
[More info here.](https://help.github.com/articles/using-pull-requests)

## Version Numbers
Starting from the v2.77.0 release, Smartsheet SDKs will use a new versioning strategy. Since all users are on the Smartsheet API 2.0, the SDK version numbers will start with 2. The 2nd number will be an internal reference number. The 3rd number is for incremental changes. 

For example, v2.77.0 means that you are using our 2.0 version of the API, the API is synched internally to a tag of 77, and then if there are numbers after the last decimal, that will indicate a minor change.

## Support

If you have any questions or issues with this SDK please post on [Stack Overflow using the tag "smartsheet-api"](http://stackoverflow.com/questions/tagged/smartsheet-api) or contact us directly at api@smartsheet.com.

## Release Notes

Each specific release is available documented here: [GitHub](https://github.com/smartsheet-platform/smartsheet-javascript-sdk/tags)
