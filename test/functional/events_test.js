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

  afterEach(function() {
    smartsheet = null;
    requestor = null;
  });

  describe('#Events', function() {
    it('should iterate through stream data until all data has been returned using the since parameter', function() {
        // call events API with since query parameter
        let moreEventsAvailable = true;
        let options = {
            queryParameters: {
                since: '2018-01-09T17:41:05Z',
                maxCount: 1
            }
        }

        async function getEvents(moreEventsAvailable) {
        do {
            let result = await smartsheet.events.getEvents(options);
            should(result.data).have.property('nextStreamPosition');
            should(result.data).have.property('moreAvailable');
            should(result.data).have.property('data');

            // subsequent calls must use the nextStreamPosition value
            options = {
                queryParameters: {
                    streamPosition: result.nextStreamPosition,
                    maxCount: 1
                }
            }
            moreEventsAvailable = result.moreAvailable;
        }
        while (moreEventsAvailable);
        }

        getEvents(moreEventsAvailable);
    });
  });
});
