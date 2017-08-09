# Smartsheet SDK for JavaScript

This is an SDK to simplify connecting to the [Smartsheet API](http://www.smartsheet.com/developers/api-documentation) from Node.js applications.

*Please note that this SDK is beta and may change significantly in the future.*

## System Requirements

The SDK supports Node.js versions 6.x or later.

## Installation

To install this SDK, simply run the following command in a terminal window: 

    npm install smartsheet

## Documentation

The Smartsheet API documentation with corresponding SDK example code can be found [here](http://www.smartsheet.com/developers/api-documentation). 

## Example Usage

To call the API, you must have an access token, which looks something like this example: ll352u9jujauoqz4gstvsae05. You can find the access token in the UI at Account > Personal Settings > API Access. 

The following is a brief sample using promises that shows you how to:

* Initialize the client
* List all sheets
* Load one sheet

    // Initialize the client
    var client = require('smartsheet');
    var smartsheet = client.createClient({accessToken:'ll352u9jujauoqz4gstvsae05'});

    // The `smartsheet` variable now contains access to all of the APIs.

    // List all sheets
    smartsheet.sheets.listSheets({})
        .then(function(sheetsList) {
            console.log(data);
        })
        .catch(function(error) {
            console.log(error);
        });

    // In the response, you should see a unique sheet Id for each sheet.
    // Get a sheet
    smartsheet.sheets.getSheet({id: sheetId})
        .then(function(sheetInfo) {
            console.log(data);
        })
        .catch(function(error) {
            console.log(error);
        });

Although the example above is using promises and the API documentation samples use promises, you could also access the APIs in this SDK by using callbacks.

    // List all sheets using callbacks
    smartsheet.sheets.listSheets({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

 See the [node-read-write-sheet](https://github.com/smartsheet-samples/node-read-write-sheet) project for a code example that shows how to call methods to read and write to a sheet using this SDK.

## Contributing

If you would like to contribute a change to the SDK, please fork a branch and then submit a pull request.
[More info here.](https://help.github.com/articles/using-pull-requests)

## Support

If you have any questions or issues with this SDK please post on [Stack Overflow using the tag "smartsheet-api"](http://stackoverflow.com/questions/tagged/smartsheet-api) or contact us directly at api@smartsheet.com.

## Release Notes

Each specific release is available for download via [GitHub](https://github.com/smartsheet-platform/smartsheet-javascript-sdk/tags).

**v0.0.1-beta (Aug 12, 2015)**
* Initial Release of the Smartsheet SDK for JavaScript

*Note*: Minor changes that result in a patch version increment in NPM (such as updates to the README) will not be tagged as a Release in GitHub.
