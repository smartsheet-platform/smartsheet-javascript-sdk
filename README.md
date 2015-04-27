# Smartsheet SDK for JavaScript

**Please not the initial version of the SDK is Pre-Alpha because there can be breaking changes**

[Smartsheet Platform](http://smartsheet.com/developers) extends the the power of [Smartsheet](http://www.smartsheet.com). 
Check out the [documentation](http://www.smartsheet.com/developers/api-documentation) for a more detailed API reference 
along with the request and response examples for all available methods. Have any questions? Check out our tag on our 
[Stackoverflow](http://stackoverflow.com/questions/tagged/smartsheet-api). 

## Installation 

    npm install smartsheet
  
  
## Documentation 

The documentation for the APIs can be [found here](http://www.smartsheet.com/developers/api-documentation). If you 
need to know what the format of the request needs to be check here!

## Usage 

All APIs are exposed inside the root module that is created using the following: 

    var client = require('smartsheet');
    var smartsheet = client.create({accessToken:'ACCESSTOKEN'});
    eg..
    smartsheet.sheets //contains methods to create, get, update and delete sheets.
  
The smartsheet variable now contains access to all the APIs [found here](http://www.smartsheet.com/developers/api-documentation).

## Unit Tests

Inside the /test folder there are unit tests that can be run. These are helpful if you would like to expand/change and 
make a pull request. To use these run the following command in the root directory after you clone the repository. 

    npm test
    
## Contributing 

If you would like to contribute a change to the SDK, please fork a branch and then submit a pull request. 
[More info here.](https://help.github.com/articles/using-pull-requests)

## SDK Documentation

### Table of Contents

#### [Sheet Methods](#sheet-methods)

- [Create Sheet](#create-sheet)


####Sheet Methods

This is to [create a new sheet](http://www.smartsheet.com/developers/api-documentation#h.4i2d52c7nur1).  

##### Using Promises

		smartsheet.sheets.createSheet({body: smartsheet.constants.sheet})
		.then(function(data) {
		  console.log('sheet created', data);
		})
		.catch(function(error) {
		  console.log('sheet error', error);
		});

##### Using Callbacks

		smartsheet.sheets.createSheet({body: smartsheet.constants.sheet}, function(err, data) {
		  if (err) {
		    console.log(err);
		  }
		  console.log(data);
		});

#License

Copyright 2015 [Smartsheet](www.smartsheet.com)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
