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

// List all sheets
smartsheet.sheets.listSheets()
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

## Testing

The source code comes with several scripts for running tests:

|Script|Action|
|---|---|
|`npm run test`|Runs all tests|
|`npm run test-functional`|Runs only functional tests|
|`npm run coverage`|Runs functional tests and reports on code coverage|
|`gulp jshint`|Runs JSHint against the codebase|
|`gulp [watch]`|Watches the codebase and runs JSHint whenever changes are made|

## Contributing

If you would like to contribute a change to the SDK, please fork a branch and then submit a pull request.
[More info here.](https://help.github.com/articles/using-pull-requests)

## Support

If you have any questions or issues with this SDK please post on [Stack Overflow using the tag "smartsheet-api"](http://stackoverflow.com/questions/tagged/smartsheet-api) or contact us directly at api@smartsheet.com.

## Release Notes

Each specific release is available for download via [GitHub](https://github.com/smartsheet-platform/smartsheet-javascript-sdk/tags).

**v1.0.0 (October 2017)**
Full 1.0.0 release

**v1.0.0-beta.0 (October 2017)**
Beta release of the Smartsheet SDK for JavaScript
* **Major Change**: The previous release supported attaching URLs to Smartsheet objects, but not files.  This release allows the attachment of files through new methods.
  * `sheets.addFileAttachment`, `sheets.addCommentFileAttachment`, and `sheets.addRowFileAttachment` are new endpoints that allow for the attachment of files.
  * `sheets.addUrlAttachment`, `sheets.addCommentUrlAttachment`, and `sheets.addRowUrlAttachment` are the new, recommended methods for attaching URLs.
  * `sheets.addAttachment`, `sheets.addCommentAttachment`, and `sheets.addRowAttachment` still work as before, permitting URL attachments; these methods are not recommended, and may be deprecated in the future.

**v0.0.1-beta (Aug 12, 2015)**
Initial Release of the Smartsheet SDK for JavaScript

*Note*: Minor changes that result in a patch version increment in NPM (such as updates to the README) will not be tagged as a Release in GitHub.
