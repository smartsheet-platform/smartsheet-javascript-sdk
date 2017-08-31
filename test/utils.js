var should = require('should');
var request = require('request');
var sinon = require('sinon');
var Promise = require('bluebird');
var _ = require('underscore');

var constants = require('../lib/utils/constants');
var smartsheet = require('../lib/utils/httpUtils');

var sample = {
  name : 'name'
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

    it('should have POST file method',function(){
      smartsheet.should.have.property('postFile');
    });

    it('should have PUT method',function(){
      smartsheet.should.have.property('put');
    });

    it('should have DELETE method',function(){
      smartsheet.should.have.property('delete');
    });

    describe('#HandleResponse', function () {
      var mockResponse = null;
      var mockBody = null;

      beforeEach(function() {
        mockResponse = {
          statusCode: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };

        mockBody = '{"hello":"world"}';
        mockBodyError = '{"errorCode": 911, "message":"EMERGENCY"}';
      });

      afterEach(function() {
        mockResponse = null;
        mockBody = null;
      });

      it('should return a rejected promise if status code is not 200', function() {
        mockResponse.statusCode = 500;
        smartsheet.handleResponse(mockResponse, mockBodyError)
        .catch(function(error) {
          error.statusCode.should.equal(500);
          error.message.should.equal('EMERGENCY');
          error.errorCode.should.equal(911);
        });
      });

      it('should return parsed JSON body', function() {
        var parsed = JSON.parse(mockBody);
        var result = smartsheet.handleResponse(mockResponse, mockBody);
        result.hello.should.equal(parsed.hello);
      });

      it('should return the body if content type is not application/json',function(){
        mockResponse.headers['content-type'] = 'application/xml';
        var result = smartsheet.handleResponse(mockResponse, mockBody);
        result.should.equal(mockBody);
      });
    });

    describe('#buildUrl', function() {
      var host = null;

      beforeEach(function() {
        host = process.env.SMARTSHEET_API_HOST = 'host/';
      });

      afterEach(function() {
        process.env.SMARTSHEET_API_HOST = '';
        host = null;
      });

      it('should return the set HOST with URL appended', function() {
        var url = 'test';
        var builtUrl = smartsheet.internal.buildUrl({url:url});
        builtUrl.should.equal(host + url);
      });

      it('url should equal https://api.smartsheet.com/', function() {
        process.env.SMARTSHEET_API_HOST = '';
        var builtUrl = smartsheet.internal.buildUrl({});
        builtUrl.should.equal('https://api.smartsheet.com/');
      });

      it('url should contain the host + url', function() {
        var builtUrl = smartsheet.internal.buildUrl({url: 'url/'});
        builtUrl.should.equal(host + 'url/');
      });

      it('url should contain the ID', function() {
        var builtUrl = smartsheet.internal.buildUrl({url: 'url/', id: '123'});
        builtUrl.should.equal(host + 'url/123');
      });
    });

    describe('#buildHeaders', function() {
      var newType = 'text/xml';
      var applicationJson = 'application/json';

      it('authorization header should have token', function() {
        var headers = smartsheet.internal.buildHeaders({accessToken: 'token'});
        headers.Authorization.should.equal('Bearer token');
      });

      it('accept header should equal ' + applicationJson, function() {
        var headers = smartsheet.internal.buildHeaders({});
        headers.Accept.should.equal(applicationJson);
      });

      it('accept header should equal ' + newType, function() {
        var headers = smartsheet.internal.buildHeaders({accept: newType});
        headers.Accept.should.equal(newType);
      });

      it('content-type header should ' + applicationJson, function() {
        var headers = smartsheet.internal.buildHeaders({contentType: applicationJson});
        headers['Content-Type'].should.equal(applicationJson);
      });

      it('content-type header should equal ' + newType, function() {
        var headers = smartsheet.internal.buildHeaders({contentType: newType});
        headers['Content-Type'].should.equal(newType);
      });

      it('Content-Disposition should equal filename', function() {
        var headers = smartsheet.internal.buildHeaders({fileName: 'test'});
        headers['Content-Disposition'].should.equal('attachment; filename="test"');
      });

      it('Content-Length should equal 123', function() {
        var headers = smartsheet.internal.buildHeaders({fileName: 'test',   fileSize: 123});
        headers['Content-Length'].should.equal(123);
      });
    });
  });

  describe('#GET', function() {
    describe('#Successful request', function() {
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

      it('request should resolve promise as true',function() {
        return smartsheet.get(sampleRequest)
          .then(function(data) {
            data.should.be.true;
          });
      });

      it('request should call callback as true',function() {
        smartsheet.get(sampleRequest, function(err, data) {
          data.should.be.true;
        });
      });
    });

    describe('#Error on request', function() {
      var stub = null;
      var handleResponseStub = null;
      var mockBody;

      beforeEach(function() {
        stub = sinon.stub(request, 'getAsync');
        handleResponseStub = sinon.stub(smartsheet, 'handleResponse');
        var mockResponse = {
          statusCode: 403,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        mockBody = {error:true};
        stub.returns(new Promise.reject(mockBody));
        handleResponseStub.returns(true);
      });

      afterEach(function() {
        stub.restore();
        handleResponseStub.restore();
      });

      it('request should error as false 1',function(){
        return smartsheet.get(sampleRequest)
          .catch(function(error) {
            error.error.should.equal(true);
          });
      });

      it('request should error as false 2',function(){
        smartsheet.get(sampleRequest, function(err, data) {
          err.should.be.equal(mockBody);
        });
      });
    });

    describe('#Arguments', function() {
      var spyGet;

      beforeEach(function() {
        spyGet = sinon.spy(request, 'getAsync');
      });

      afterEach(function() {
        spyGet.restore();
      });

      it('headers sent as part of request should match given',function() {
        var sampleHeaders = {
          Authorization: 'Bearer TOKEN',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'smartsheet-javascript-sdk'
        };
        smartsheet.get(sampleRequest);
        spyGet.args[0][0].headers.Authorization.should.equal(sampleHeaders.Authorization);
        spyGet.args[0][0].headers.Accept.should.equal(sampleHeaders.Accept);
        spyGet.args[0][0].headers['Content-Type'].should.equal(sampleHeaders['Content-Type']);
        spyGet.args[0][0].headers['User-Agent'].should.equal(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given',function() {
        smartsheet.get(sampleRequest);
        spyGet.args[0][0].url.should.equal('https://api.smartsheet.com/URL');
      });

      it('queryString sent to request should match given',function() {
        smartsheet.get(sampleRequestWithQueryParameters);
        spyGet.args[0][0].qs.should.equal(sampleRequestWithQueryParameters.queryParameters);
      });
    });

    describe('#Retry', function() {
      var stub = null;
      var handleResponseStub = null;

      var sampleRequestForRetry;

      function givenGetReturnsError() {
        stub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(new Promise.reject({errorCode: 4001}));
      }

      function givenGetReturnsSuccess() {
        stub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(true);
      }

      beforeEach(function() {
        stub = sinon.stub(request, 'getAsync');
        handleResponseStub = sinon.stub(smartsheet, 'handleResponse');

        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryTime = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(function() {
        stub.restore();
        handleResponseStub.restore();
      });

      it('get called once on success', function() {
        givenGetReturnsSuccess();
        smartsheet.get(sampleRequestForRetry);
        stub.callCount.should.be.equal(1);
      });

      it('get retried on error', function() {
        givenGetReturnsError();
        return smartsheet.get(sampleRequestForRetry)
        .catch(function(err) {
          stub.callCount.should.be.above(1);
        });
      });

      it('get does not exceed max time', function() {
        givenGetReturnsError();
        var startTime = Date.now();
        return smartsheet.get(sampleRequestForRetry)
        .catch(function(err) {
          sampleRequestForRetry.maxRetryTime.should.be.above(Date.now() - startTime - 5);
        });
      });
    });
  });

  describe('#POST', function() {
    describe('#Successful request', function() {
      var stub = null;
      var handleResponseStub = null;

      beforeEach(function() {
        stub = sinon.stub(request, 'postAsync');
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
        return smartsheet.post(sampleRequest)
          .then(function(data) {
            data.should.equal(true);
          });
      });

      it('request should call callback as true',function() {
        smartsheet.post(sampleRequest, function(err, data) {
          data.should.be.true;
        });
      });
    });

    describe('#Error on request', function() {
      var stub = null;
      var handleResponseStub = null;
      var mockBody;

      beforeEach(function() {
        stub = sinon.stub(request, 'postAsync');
        handleResponseStub = sinon.stub(smartsheet, 'handleResponse');
        var mockResponse = {
          statusCode: 403,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        mockBody = {error:true};
        stub.returns(new Promise.reject(mockBody));
        handleResponseStub.returns(true);
      });

      afterEach(function() {
        stub.restore();
        handleResponseStub.restore();
      });

      it('request should error as false',function(){
        return smartsheet.post(sampleRequest)
          .catch(function(error) {
            error.error.should.equal(true);
          });
      });

      it('request should error as false',function(){
        smartsheet.post(sampleRequest, function(err, data) {
          err.should.be.equal(mockBody);
        });
      });
    });

    describe('#Arguments', function() {
      var spyPost;

      beforeEach(function() {
        spyPost = sinon.spy(request, 'postAsync');
      });

      afterEach(function() {
        spyPost.restore();
      });

      it('headers sent as part of request should match given',function() {
        var sampleHeaders = {
          Authorization: 'Bearer TOKEN',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'smartsheet-javascript-sdk'
        };
        smartsheet.post(sampleRequest);
        spyPost.args[0][0].headers.Authorization.should.equal(sampleHeaders.Authorization);
        spyPost.args[0][0].headers.Accept.should.equal(sampleHeaders.Accept);
        spyPost.args[0][0].headers['Content-Type'].should.equal(sampleHeaders['Content-Type']);
        spyPost.args[0][0].headers['User-Agent'].should.equal(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given',function() {
        smartsheet.post(sampleRequest);
        spyPost.args[0][0].url.should.equal('https://api.smartsheet.com/URL');
      });

      it('queryString sent to request should match given',function() {
        smartsheet.post(sampleRequestWithQueryParameters);
        spyPost.args[0][0].qs.should.equal(sampleRequestWithQueryParameters.queryParameters);
      });

      it('body sent to request should match given',function() {
        smartsheet.post(sampleRequestWithQueryParameters);
        spyPost.args[0][0].body.should.equal(JSON.stringify(sampleRequestWithQueryParameters.body));
      });
    });
  });

  describe('#PUT', function() {
    describe('#Successful request', function() {
      var stub = null;
      var handleResponseStub = null;

      beforeEach(function() {
        stub = sinon.stub(request, 'putAsync');
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
        return smartsheet.put(sampleRequest)
          .then(function(data) {
            data.should.equal(true);
          });
      });

      it('request should call callback as true',function() {
        smartsheet.put(sampleRequest, function(err, data) {
          data.should.be.true;
        });
      });
    });

    describe('#Error on request', function() {
      var stub = null;
      var handleResponseStub = null;
      var mockBody;

      beforeEach(function() {
        stub = sinon.stub(request, 'putAsync');
        handleResponseStub = sinon.stub(smartsheet, 'handleResponse');
        var mockResponse = {
          statusCode: 403,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        mockBody = {error:true};
        stub.returns(new Promise.reject(mockBody));
        handleResponseStub.returns(true);
      });

      afterEach(function() {
        stub.restore();
        handleResponseStub.restore();
      });

      it('request should error as false',function(){
        return smartsheet.put(sampleRequest)
          .catch(function(error) {
            error.error.should.equal(true);
          });
      });

      it('request should error as false',function(){
        smartsheet.put(sampleRequest, function(err, data) {
          err.should.be.equal(mockBody);
        });
      });
    });

    describe('#Arguments', function() {
      var spyPut;

      beforeEach(function() {
        spyPut = sinon.spy(request, 'putAsync');
      });

      afterEach(function() {
        spyPut.restore();
      });

      it('headers sent as part of request should match given',function() {
        var sampleHeaders = {
          Authorization: 'Bearer TOKEN',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'smartsheet-javascript-sdk'
        };
        smartsheet.put(sampleRequest);
        spyPut.args[0][0].headers.Authorization.should.equal(sampleHeaders.Authorization);
        spyPut.args[0][0].headers.Accept.should.equal(sampleHeaders.Accept);
        spyPut.args[0][0].headers['Content-Type'].should.equal(sampleHeaders['Content-Type']);
        spyPut.args[0][0].headers['User-Agent'].should.equal(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given',function() {
        smartsheet.put(sampleRequest);
        spyPut.args[0][0].url.should.equal('https://api.smartsheet.com/URL');
      });

      it('queryString sent to request should match given',function() {
        smartsheet.put(sampleRequestWithQueryParameters);
        spyPut.args[0][0].qs.should.equal(sampleRequestWithQueryParameters.queryParameters);
      });

      it('body sent to request should match given',function() {
        smartsheet.put(sampleRequestWithQueryParameters);
        spyPut.args[0][0].body.should.equal(JSON.stringify(sampleRequestWithQueryParameters.body));
      });
    });
  });

  describe('#DELETE', function() {
    describe('#Successful request', function() {
      var stub = null;
      var handleResponseStub = null;

      beforeEach(function() {
        stub = sinon.stub(request, 'delAsync');
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
        return smartsheet.delete(sampleRequest)
          .then(function(data) {
            data.should.equal(true);
          });
      });

      it('request should call callback as true',function() {
        smartsheet.delete(sampleRequest, function(err, data) {
          data.should.be.true;
        });
      });
    });

    describe('#Error on request', function() {
      var stub = null;
      var handleResponseStub = null;
      var mockBody;

      beforeEach(function() {
        stub = sinon.stub(request, 'delAsync');
        handleResponseStub = sinon.stub(smartsheet, 'handleResponse');
        var mockResponse = {
          statusCode: 403,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        mockBody = {error:true};
        stub.returns(new Promise.reject(mockBody));
        handleResponseStub.returns(true);
      });

      afterEach(function() {
        stub.restore();
        handleResponseStub.restore();
      });

      it('request should error as false',function(){
        return smartsheet.delete(sampleRequest)
          .catch(function(error) {
            error.error.should.equal(true);
          });
      });

      it('request should error as false',function(){
        smartsheet.delete(sampleRequest, function(err, data) {
          err.should.be.equal(mockBody);
        });
      });
    });

    describe('#Arguments', function() {
      var spyPut;

      beforeEach(function() {
        spyPut = sinon.spy(request, 'delAsync');
      });

      afterEach(function() {
        spyPut.restore();
      });

      it('headers sent as part of request should match given',function() {
        var sampleHeaders = {
          Authorization: 'Bearer TOKEN',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'smartsheet-javascript-sdk'
        };
        smartsheet.delete(sampleRequest);
        spyPut.args[0][0].headers.Authorization.should.equal(sampleHeaders.Authorization);
        spyPut.args[0][0].headers.Accept.should.equal(sampleHeaders.Accept);
        spyPut.args[0][0].headers['Content-Type'].should.equal(sampleHeaders['Content-Type']);
        spyPut.args[0][0].headers['User-Agent'].should.equal(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given',function() {
        smartsheet.delete(sampleRequest);
        spyPut.args[0][0].url.should.equal('https://api.smartsheet.com/URL');
      });

      it('queryString sent to request should match given',function() {
        smartsheet.delete(sampleRequestWithQueryParameters);
        spyPut.args[0][0].qs.should.equal(sampleRequestWithQueryParameters.queryParameters);
      });
    });
  });
});
