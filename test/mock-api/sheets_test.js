var sinon = require('sinon');
var should = require('should');
var assert = require('assert');
var helpers = require('./helpers');


describe('Mock API SDK Tests', function() {
  var client = helpers.setupClient();

  describe('#Sheets', function() {
    var scenarios = [
      {
        "name": "List Sheets - No Params",
        "method": client.sheets.listSheets,
        "shouldError": false,
        "options": {}
      },
      {
        "name": "List Sheets - Include Owner Info",
        "method": client.sheets.listSheets,
        "shouldError": false,
        "options": {
          "queryParameters": {
            "include": "ownerInfo"
          }
        }
      },
      {
        "name": "Create Sheet - Invalid - No Columns",
        "method": client.sheets.createSheet,
        "shouldError": true,
        "options": {
          "body": {
            "name": "New Sheet",
            "columns": []
          }
        }
      }
    ];

    helpers.defineMockApiTests(scenarios);
  });
});
