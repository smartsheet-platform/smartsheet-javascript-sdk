var sinon = require('sinon');
var should = require('should');
var assert = require('assert');
// var helpers = require('helpers');

var smartsheet = null;


describe('Mock API SDK Tests', function() {
  
  beforeEach(function() {
    process.env.SMARTSHEET_API_HOST = "http://localhost:8082/";
    var client = require('../..');
    smartsheet = client.createClient({accessToken:'1234'});
  });

  afterEach(function() {
    smartsheet = null;
    requestor = null;
  });

  describe('#Sheets', function() {
      it('retrieve list of sheets', function () {
      // First call to getSheet
      return smartsheet.sheets.listSheets({apiScenario: "List Sheets - No Params"})
      .then(function(sheets) {
        should(sheets.data[0].name).equal("Copy of Sample Sheet");
      })
      .catch(function(error){
        // helpers.getMessage();
        var messageObj = JSON.parse(error.message);
        return Promise.reject(new Error(messageObj.message));
      });
    });
  });
});