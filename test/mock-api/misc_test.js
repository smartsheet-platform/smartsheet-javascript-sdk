var sinon = require("sinon");
var should = require("should");
var assert = require("assert");
var helpers = require("./helpers");

describe("Mock API SDK Tests", function() {
  var client = helpers.setupClient();

  describe("#Misc", function() {
    var scenarios = [
      {
        name: "Move row to another sheet",
        method: client.sheets.moveRowToAnotherSheet,
        shouldError: false,
        options: {
          sheetId: 1228520367122308,
          body: {
            rowIds: [1765250516182916],
            to: {
              sheetId: 799249123305348
            }
          }
        }
      },
      {
        name: "Copy row to another sheet",
        method: client.sheets.copyRowToAnotherSheet,
        shouldError: false,
        options: {
          sheetId: 1228520367122308,
          body: {
            rowIds: [2891150423025540],
            to: {
              sheetId: 799249123305348
            }
          }
        }
      }
    ];

    helpers.defineMockApiTests(scenarios);
  });
});
