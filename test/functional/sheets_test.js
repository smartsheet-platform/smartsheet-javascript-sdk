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

  describe('#Sheets', function() {
    it('should not change base URL when getSheetVersion is called first', function() {
      // First call to getSheet
      smartsheet.sheets.getSheet({ id: 100 });
      should(requestor.get.firstCall.args[0]).have.property('url', 'sheets/');

      // First call to getSheetVersion
      smartsheet.sheets.getSheetVersion({ sheetId: 100 });
      should(requestor.get.secondCall.args[0]).have.property('url', 'sheets/100/version');

      // Second call to getSheet
      smartsheet.sheets.getSheet({ id: 100 });
      should(requestor.get.thirdCall.args[0]).have.property('url', 'sheets/');
    });

    it('should not change base URL when getOrganizationSheets is called first', function () {
      // First call to getSheet
      smartsheet.sheets.getSheet({ id: 100 });
      should(requestor.get.firstCall.args[0]).have.property('url', 'sheets/');

      // First call to getSheetVersion
      smartsheet.sheets.listOrganizationSheets();
      should(requestor.get.secondCall.args[0]).have.property('url', 'users/sheets');

      // Second call to getSheet
      smartsheet.sheets.getSheet({ id: 100 });
      should(requestor.get.thirdCall.args[0]).have.property('url', 'sheets/');
    });
  });
});
