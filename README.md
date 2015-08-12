# Smartsheet SDK for JavaScript

This is an SDK to simplify connecting to the [Smartsheet API](http://www.smartsheet.com/developers/api-documentation) from Node.js applications.

**Please note that this SDK is beta and may change significantly in the future.**

## Installation

To install this SDK, simply run the following command in a terminal window: 

    npm install smartsheet

## Documentation

The Smartsheet API documentation can be found [here](http://www.smartsheet.com/developers/api-documentation). 

See [this page](https://github.com/smartsheet-platform/smartsheet-javascript-sdk/blob/master/ExampleUsage.md) for code examples that show how to use this SDK.

## Contributing

If you would like to contribute a change to the SDK, please fork a branch and then submit a pull request.
[More info here.](https://help.github.com/articles/using-pull-requests)

## Support

If you have any questions or issues with this SDK please post on [StackOverflow using the tag "smartsheet-api"](http://stackoverflow.com/questions/tagged/smartsheet-api) or contact us directly at api@smartsheet.com.

## Example Usage

All APIs are exposed inside the root module that is created using the following:

    var client = require('smartsheet');
    var smartsheet = client.createClient({accessToken:'ACCESSTOKEN'});

The **smartsheet** variable now contains access to all of the APIs [documented here](http://www.smartsheet.com/developers/api-documentation).
See [this page](https://github.com/smartsheet-platform/smartsheet-javascript-sdk/blob/master/ExampleUsage.md) for code examples that show how to call various methods using this SDK.

## Release Notes

Each specific release is available for download via [Github](https://github.com/smartsheet-platform/smartsheet-javascript-sdk/tags).

**v0.0.1-beta (Aug 12, 2015)**
* Initial Release of the Smartsheet SDK for JavaScript

*Note*: Minor changes that result in a patch version increment in NPM (such as updates to the README) will not be tagged as a Release in GitHub.
