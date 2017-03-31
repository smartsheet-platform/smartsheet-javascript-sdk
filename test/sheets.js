var sinon = require('sinon');
var should = require('should');
var utils = require('../lib/utils/httpUtils.js');

var smartsheet = null;
var getSpy = null;

describe('Client Unit Tests', function() {
  beforeEach(function() {
    client = require('../');
    smartsheet = client.createClient({accessToken:'1234'});

    getSpy = sinon.spy(utils, 'get');
  });

  afterEach(function() {
    smartsheet = null;
    utils.get.restore();
  });

  describe('#Sheets', function() {
    it('should not change base URL when getSheetVersion is called first', function() {
      // First call to getSheet
      smartsheet.sheets.getSheet({ id: 100 });
      should(getSpy.firstCall.args[0]).have.property('url', '2.0/sheets/');

      // First call to getSheetVersion
      smartsheet.sheets.getSheetVersion({ sheetId: 100 });
      should(getSpy.secondCall.args[0]).have.property('url', '2.0/sheets/100/version');

      // Second call to getSheet
      smartsheet.sheets.getSheet({ id: 100 });
      should(getSpy.thirdCall.args[0]).have.property('url', '2.0/sheets/');
    });

    it('should not change base URL when getOrganizationSheets is called first', function () {
      // First call to getSheet
      smartsheet.sheets.getSheet({ id: 100 });
      should(getSpy.firstCall.args[0]).have.property('url', '2.0/sheets/');

      // First call to getSheetVersion
      smartsheet.sheets.listOrganizationSheets();
      should(getSpy.secondCall.args[0]).have.property('url', '2.0/users/sheets');

      // Second call to getSheet
      smartsheet.sheets.getSheet({ id: 100 });
      should(getSpy.thirdCall.args[0]).have.property('url', '2.0/sheets/');

    });
  });
});
