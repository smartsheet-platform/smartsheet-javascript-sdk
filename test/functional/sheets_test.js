var sinon = require("sinon");
var should = require("should");

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

    describe('queryParameters', () => {
      it('should send id without queryParameters', () => {
        smartsheet.sheets.getSheet({ id: 42 });
        should(requestor.get.firstCall.args[0]).have.property('id', 42);
      });

      const knownParameters = [
        { name: 'include', value: 'a,b' },
        { name: 'exclude', value: 'c,d' },
        { name: 'columnIds', value: 'c1,c2' },
        { name: 'filterId', value: Date.now() },
        { name: 'ifVersionAfter', value: Date.now() },
        { name: 'level', value: Date.now() },
        { name: 'page', value: Date.now() },
        { name: 'pageSize', value: Date.now() },
        { name: 'rowIds', value: `${Date.now()},${Date.now()}` },
        { name: 'rowNumbers', value: `${Date.now()},${Date.now()}` },
        { name: 'rowsModifiedSince', value: new Date().toISOString() },
      ];

      knownParameters.forEach((param) => {
        it(`should send known param ${param.name}=${param.value}`, () => {
          const qp = {};
          qp[param.name] = param.value;
          smartsheet.sheets.getSheet({
            id: 42,
            queryParameters: qp,
          });
          should(requestor.get.firstCall.args[0].queryParameters).have.property(
            param.name,
            param.value
          );
        });
      });
    });
  });
});
