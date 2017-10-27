var sinon = require('sinon');
var should = require('should');

var requestor = null;
var smartsheet = null;

describe('Mock API SDK Tests', function() {
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

  describe('#Rows', function() {
 
  });
});