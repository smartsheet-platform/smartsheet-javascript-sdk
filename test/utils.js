var sinon = require('sinon');
var should = require('should');
var request = require('request');
var sinon = require('sinon');
var Promise = require('bluebird');

var smartsheet = require('../lib/utils/httpUtils');;

var sample = {

};

var sampleRequest = {
  url:'URL',
  accessToken:'TOKEN'
};

var sampleRequestNoContentType = {
  accessToken: 'TOKEN',
  body: sample
};

var sampleRequestWithQueryParameters = {
  accessToken: 'TOKEN',
  contentType: 'application/json',
  body: sample,
  queryParameters: {
    parameter1:'',
    parameter2:''
  }
};

describe('Utils Unit Tests', function() {
  describe('#HttpUtils', function() {
    it('should have GET method',function(){
      smartsheet.should.have.property('get');
    });

    it('should have POST method',function(){
      smartsheet.should.have.property('post');
    });

    it('should have PUT method',function(){
      smartsheet.should.have.property('put');
    });

    it('should have DELETE method',function(){
      smartsheet.should.have.property('delete');
    });

    //it('should return an error if one is returned in the callback of request',function(){
    //});
    //
    //it('should return an error if response code is not 200',function(){
    //});
    //
    //it('should parse the JSON',function(){
    //});
    //
    //it('should parse the error response with statusCode of 200',function(){
    //});
  });

  describe('#GET', function() {
    describe('#Success', function() {
      var stub = null;
      var handleResponseStub = null;

      beforeEach(function() {
        stub = sinon.stub(request, 'getAsync');
        handleResponseStub = sinon.stub(smartsheet, 'handleResponse');
        var mockResponse = {
          statusCode: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        var mockBody = '{"hello":"world"}';
        stub.returns(new Promise.resolve([mockResponse, mockBody]));
        handleResponseStub.returns(true);
      });

      afterEach(function() {
        stub.restore();
        handleResponseStub.restore();
      });

      it('request should resolve as true',function() {
        return smartsheet.get(sampleRequest)
          .then(function(data) {
            data.should.equal(true);
          });
      });
    });

    describe('#Error', function() {
      var stub = null;
      var handleResponseStub = null;

      beforeEach(function() {
        stub = sinon.stub(request, 'getAsync');
        handleResponseStub = sinon.stub(smartsheet, 'handleResponse');
        var mockResponse = {
          statusCode: 403,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        var mockBody = {error:true};
        stub.returns(new Promise.reject(mockBody));
        handleResponseStub.returns(true);
      });

      afterEach(function() {
        stub.restore();
        handleResponseStub.restore();
      });

      it('request should error as false',function(){
        return smartsheet.get(sampleRequest)
          .catch(function(error) {
            error.error.should.equal(true);
          });
      });
    });



  });

  describe('#POST', function() {
  });

  describe('#PUT', function() {

  });

  describe('#DELETE', function() {

  });
});

