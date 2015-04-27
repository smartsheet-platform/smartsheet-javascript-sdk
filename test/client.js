var sinon = require('sinon');
var should = require('should');

var smartsheet = null;

describe('Client Unit Tests', function() {
  var sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    client = require('../');
    smartsheet = client.createClient({accessToken:'1234'});
  });

  afterEach(function() {
    smartsheet = null;
  });

  describe('#Constants', function() {
    it('should have Constants object', function() {
      Object.keys(smartsheet.constants).should.be.length(6);
      smartsheet.should.have.property('constants');
      smartsheet.constants.should.have.property('accessLevel');
      smartsheet.constants.should.have.property('accessScope');
      smartsheet.constants.should.have.property('types');
      smartsheet.constants.should.have.property('paperSize');
      smartsheet.constants.should.have.property('acceptHeaders');
      smartsheet.constants.should.have.property('sheet');
    });
  });

  describe('#Sheets', function() {
    it('should have Sheets object',function(){
      smartsheet.should.have.property('sheets');
    });

    it('should have Sheets get methods', function() {
      Object.keys(smartsheet.sheets).should.be.length(12);
      smartsheet.sheets.should.have.property('getSheet');
      smartsheet.sheets.should.have.property('getSheetAsCsv');
      smartsheet.sheets.should.have.property('getSheetAsPdf');
      smartsheet.sheets.should.have.property('getSheetAsExcel');
      smartsheet.sheets.should.have.property('getSheets');
    });

    it('should have Sheets create methods', function() {
      smartsheet.sheets.should.have.property('createSheet');
      smartsheet.sheets.should.have.property('createSheetInFolder');
      smartsheet.sheets.should.have.property('createSheetInWorkspace');
    });

    it('should have Sheets update methods', function() {
      smartsheet.sheets.should.have.property('updateSheet');
    });

    it('should have Sheets delete methods', function() {
      smartsheet.sheets.should.have.property('deleteSheet');
    })
  });
});
