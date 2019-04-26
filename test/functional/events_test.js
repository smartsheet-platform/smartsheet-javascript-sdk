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

  // afterEach(function() {
  //   smartsheet = null;
  //   requestor = null;
  // });

  describe('#Events', async function() {
    it('should iterate through stream data until all data has been returned', async function() {
      // call events API with since query parameter
      let options = {
        queryParameters: {
          since: '2018-01-09T17:41:05Z',
          maxCount: 10
        }
      }

      async function getEvents(options) {
        try {
          let result = await smartsheet.events.getEvents(options);
          should(result).have.property('moreAvailable');
          should(result).have.property('data');
          should(result).have.property('nextStreamPosition');
          
          // should(result).have.property('xxxx');
          getNextStreamOfEvents(result.moreAvailable, result.nextStreamPosition);
        } catch(error) {
          console.error(error)
          throw error
        }
      }
      
      function getNextStreamOfEvents(moreEventsAvailable, nextStreamPosition) {
        // subsequent calls require the streamPosition property
        options = {
          queryParameters: {
            streamPosition: nextStreamPosition,
            maxCount: 10
          }
        }

        if (moreEventsAvailable) {
          getEvents(options);
        } 
        // else {
        //   done();
        // }
      }
      
      getEvents(options);
    });
  });
});
