# Advanced Topics for the Smartsheet SDK for Javascript

## Event Reporting
The following sample demonstrates 'best' practices for enumerating events using the Smartsheet Event Reporting feature. All enumerations must begin using the since parameter to the `smartsheet.events.getEvents` method. Specify 0 as an argument (i.e. since=0) if you wish to begin enumeration at the beginning of stored event history. A more common scenario would be to enumerate events over a certain time frame by providing an ISO 8601 formatted or numerical (UNIX epoch) date as an argument to `smartsheet.events.getEvents`. In this sample, events for the previous 7 days are enumerated.

After the initial list of events is returned, you should only continue to enumerate events if the `moreAvailable` flag in the previous response indicates that more data is available. To continue the enumeration, supply an argument to the `nextStreamPosition` parameter to the `smartsheet.events.getEvents` method (you must pass in a value for `since` or `streamPosition` but never both). The `streamPosition` argument can be retrieved from the `nextStreamPosition` attribute of the previous response.

Many events have additional information available as a part of the event. That information can be accessed from the `additionalDetails` attribute (Note that attributes of the `additionalDetails` object uses camelCase/JSON names, e.g. `sheetName` not `sheet_name`). An example is provided for `sheetName` below. Information about the additional details provided can be found [here](https://smartsheet-platform.github.io/event-reporting-docs/).

```javascript
// Initialize the client
var client = require('smartsheet');
var smartsheet = client.createClient({
  accessToken: '1234',
  logLevel: 'info'
});

const currentDate = new Date();
const dateWeekAgo = currentDate.setDate(currentDate.getDate() - 7);
// The first call to the events reporting API
// requires the since query parameter.
// If you pass in an UNIX epoch date, numericDates must be true
let options = {
  queryParameters: {
    since: dateWeekAgo,
    maxCount: 10,
    numericDates: true
  }
}

function getEvents(options) {
  smartsheet.events.getEvents(options)
  .then((result) => {
    printNewSheetEvents(result);
    getNextStreamOfEvents(result.moreAvailable, result.nextStreamPosition);
  })
  .catch((error) => console.log(JSON.stringify(error)));
}

function getNextStreamOfEvents(moreEventsAvailable, nextStreamPosition) {
  // Subsequent calls require the streamPosition property
  options = {
    queryParameters: {
      streamPosition: nextStreamPosition,
      maxCount: 10
    }
  }

  if (moreEventsAvailable) {
    getEvents(options);
  } 
}

// This example is looking specifically for new sheet events
function printNewSheetEvents(result) {
  // Find all created sheets
  result.data.forEach(function (item) {
    if (item.objectType === "SHEET" && item.action === "CREATE") {
      console.log(item.additionalDetails.sheetName)
    }
  })
}

getEvents(options);
```