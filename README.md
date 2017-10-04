# Smartsheet SDK for JavaScript [![Build Status](https://travis-ci.org/armstnp/smartsheet-javascript-sdk.svg?branch=master)](https://travis-ci.org/armstnp/smartsheet-javascript-sdk) [![Coverage Status](https://coveralls.io/repos/github/armstnp/smartsheet-javascript-sdk/badge.svg?branch=master)](https://coveralls.io/github/armstnp/smartsheet-javascript-sdk?branch=master)

This is an SDK to simplify connecting to the [Smartsheet API](http://www.smartsheet.com/developers/api-documentation) from Node.js applications.

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

To call the API, you must have an access token, which looks something like this example: ll352u9jujauoqz4gstvsae05. You can find the access token in the UI at Account > Personal Settings > API Access. 

The following is a brief sample using promises that shows you how to:

* Initialize the client
* List all sheets
* Load one sheet

```javascript
// Initialize the client
var client = require('smartsheet');
var smartsheet = client.createClient({
  accessToken: 'll352u9jujauoqz4gstvsae05'
});

// The `smartsheet` variable now contains access to all of the APIs

// List all sheets
smartsheet.sheets.listSheets()
  .then(function (result) {
    // Default to first sheet
    var sheetId = result.data[0].id;

    // Load the entire sheet
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

## Configuration

When creating the client object, pass an object with any of the following options to tune its behaviour.

### Retry Configuration

* `maxRetryDurationSeconds` - The maximum time in seconds for requests to retry on eligible failure.  By default, this is set to 15 seconds.
* `calcRetryBackoff` - A function accepting the index of the retry being attempted (0 for the first retry, 1 for the second, etc.) and returning the number of milliseconds to wait until making the subsequent retry call.  By default, this is set to exponential backoff with additional jitter.

## Logging

This library leverages [**winston**](https://github.com/winstonjs/winston) for logging.  **winston** provides [documentation on configuring loggers](https://github.com/winstonjs/winston#working-with-multiple-loggers-in-winston).  To receive logs from the SDK, choose one of the following:

### Simple

Pass the `logLevel` configuration option as one of the default **winston** log levels: `silly`, `verbose`, `debug`, `info`, `warn`, or `error`.  This will default to a simple Console transport.

### Flexible

Create a **winston** container or configure the default `winston.loggers` container, adding a logger named 'smartsheet'. Pass this container in as the configuration option `loggerContainer`. _(Recommended)_

### Customized

If you choose not to use **winston** and want to use your own logger, pass a logger object as the configuration option `logger` that meets the following specification:
* `silly`, `verbose`, `debug`, `info`, `warn`, `error` - Logging methods following **winston**'s logging format
* `log` - Similar to the above, but accepting the logging level string as its initial parameter; this log level is guaranteed be one of the above options.

## Contributing

If you would like to contribute a change to the SDK, please fork a branch and then submit a pull request.
[More info here.](https://help.github.com/articles/using-pull-requests)

## Support

If you have any questions or issues with this SDK please post on [Stack Overflow using the tag "smartsheet-api"](http://stackoverflow.com/questions/tagged/smartsheet-api) or contact us directly at api@smartsheet.com.

## Release Notes

Each specific release is available for download via [GitHub](https://github.com/smartsheet-platform/smartsheet-javascript-sdk/tags).

**v1.0.0-beta.0 (October 2017)**
Beta release of the Smartsheet SDK for JavaScript

**v0.0.1-beta (Aug 12, 2015)**
Initial Release of the Smartsheet SDK for JavaScript

*Note*: Minor changes that result in a patch version increment in NPM (such as updates to the README) will not be tagged as a Release in GitHub.
