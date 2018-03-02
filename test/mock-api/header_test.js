var sinon = require("sinon");
var should = require("should");
var assert = require("assert");
var helpers = require("./helpers");

describe("Mock API SDK Tests", function() {
  var client = helpers.setupClient();

  describe("#Header", function() {
    var scenarios = [
        {
          "name": "Change Agent Header - Can Be Passed",
          "method": client.sheets.createSheet,
          "shouldError": false,
          "options": {
            "body": {
              "name": "My new sheet",
              "columns": [
                {
                  "title": "Col1",
                  "primary": true,
                  "type": "TEXT_NUMBER"
                }
              ]
            },
            "changeAgent": "MyChangeAgent"
          }
        }
      ];

    helpers.defineMockApiTests(scenarios);
  });
});
