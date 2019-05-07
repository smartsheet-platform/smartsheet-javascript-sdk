var sinon = require('sinon');
var should = require('should');

var requestor = null;
var smartsheet = null;

describe('Client Unit Tests', function() {
  beforeEach(function() {
    requestor = require('../../lib/utils/httpRequestor.js').create({});
    sinon.spy(requestor, 'get');
    var client = require('../..');
    smartsheet = client.createClient({accessToken:'1234', requestor: requestor});
  });

  describe('#Events', function() {
    it('should iterate through stream data until all data has been returned', function() {
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
    });
  });
});