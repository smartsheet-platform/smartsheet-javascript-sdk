# Advanced Topics for the Smartsheet SDK for Javascript

## Event Reporting
The following sample demonstrates best practices for consuming the event stream returned from the Smartsheet Event Reporting feature. 

The sample uses the `smartsheet.events.getEvents` method to request lists of events from the stream. The first request sets the `since` parameter with the point in time (i.e. event occurrence datetime) in the stream from which to start consuming events. The `since` parameter can be set with a datetime value that is either formatted as ISO 8601 (e.g. 2010-01-01T00:00:00Z) or as UNIX epoch (in which case the `numericDates` parameter must also be set to `true`. By default the `numericDates` parameter is set to `false`).

To consume the next list of events after the initial list of events is returned, set the `streamPosition` parameter with the `nextStreamPosition` attribute obtained from the previous request and don't set the `since` parameter with any values. This is because when using the `get` method, either the `since` parameter or the `streamPosition` parameter should be set, but never both. 

Note that the `moreAvailable` attribute in a response indicates whether more events are immediately available for consumption. If events aren't immediately available, they may still be generating so subsequent requests should keep using the same `streamPosition` value until the next list of events is retrieved.

Many events have additional information available as a part of the event. That information can be accessed from the data stored in the `additionalDetails` attribute. Information about the additional details provided can be found [here](https://smartsheet-platform.github.io/event-reporting-docs/).


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