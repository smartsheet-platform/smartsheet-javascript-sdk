var should = require('should');
var request = require('request');
var sinon = require('sinon');
var Promise = require('bluebird');
var _ = require('underscore');

var requestor = require('../lib/utils/httpRequestor').create({request: request});

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
  describe('#HttpRequestor', function() {
    it('should have GET method',function(){
      requestor.should.have.property('get');
    });

    it('should have POST method',function(){
      requestor.should.have.property('post');
    });

    it('should have POST file method',function(){
      requestor.should.have.property('postFile');
    });

    it('should have PUT method',function(){
      requestor.should.have.property('put');
    });

    it('should have DELETE method',function(){
      requestor.should.have.property('delete');
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
        var builtUrl = requestor.internal.buildUrl({url:url});
        builtUrl.should.equal(host + url);
      });

      it('url should equal https://api.smartsheet.com/', function() {
        process.env.SMARTSHEET_API_HOST = '';
        var builtUrl = requestor.internal.buildUrl({});
        builtUrl.should.equal('https://api.smartsheet.com/');
      });

      it('url should contain the host + url', function() {
        var builtUrl = requestor.internal.buildUrl({url: 'url/'});
        builtUrl.should.equal(host + 'url/');
      });

      it('url should contain the ID', function() {
        var builtUrl = requestor.internal.buildUrl({url: 'url/', id: '123'});
        builtUrl.should.equal(host + 'url/123');
      });
    });

    describe('#buildHeaders', function() {
      var newType = 'text/xml';
      var applicationJson = 'application/json';

      it('authorization header should have token', function() {
        var headers = requestor.internal.buildHeaders({accessToken: 'token'});
        headers.Authorization.should.equal('Bearer token');
      });

      it('accept header should equal ' + applicationJson, function() {
        var headers = requestor.internal.buildHeaders({});
        headers.Accept.should.equal(applicationJson);
      });

      it('accept header should equal ' + newType, function() {
        var headers = requestor.internal.buildHeaders({accept: newType});
        headers.Accept.should.equal(newType);
      });

      it('content-type header should ' + applicationJson, function() {
        var headers = requestor.internal.buildHeaders({contentType: applicationJson});
        headers['Content-Type'].should.equal(applicationJson);
      });

      it('content-type header should equal ' + newType, function() {
        var headers = requestor.internal.buildHeaders({contentType: newType});
        headers['Content-Type'].should.equal(newType);
      });

      it('Content-Disposition should equal filename', function() {
        var headers = requestor.internal.buildHeaders({fileName: 'test'});
        headers['Content-Disposition'].should.equal('attachment; filename="test"');
      });

      it('Content-Length should equal 123', function() {
        var headers = requestor.internal.buildHeaders({fileName: 'test',   fileSize: 123});
        headers['Content-Length'].should.equal(123);
      });

      it('Assume-User should equal URI encoded email', function() {
        var headers = requestor.internal.buildHeaders({assumeUser: 'john.doe@smartsheet.com'});
        headers['Assume-User'].should.equal('john.doe%40smartsheet.com');
      });
    });
  });

  describe('#GET', function() {
    describe('#Successful request', function() {
      var requestStub = null;
      var stubbedRequestor = require('../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => true});

      beforeEach(function() {
        requestStub = sinon.stub(request, 'getAsync');
        var mockResponse = {
          statusCode: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        var mockBody = '{"hello":"world"}';
        requestStub.returns(new Promise.resolve([mockResponse, mockBody]));
      });

      afterEach(function() {
        requestStub.restore();
      });

      it('request should resolve promise as true',function() {
        return stubbedRequestor.get(sampleRequest)
          .then(function(data) {
            data.should.be.true;
          });
      });

      it('request should call callback as true',function() {
        stubbedRequestor.get(sampleRequest, function(err, data) {
          data.should.be.true;
        });
      });
    });

    describe('#Error on request', function() {
      var requestStub = null;
      var stubbedRequestor = require('../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => true});
      var mockBody;

      beforeEach(function() {
        requestStub = sinon.stub(request, 'getAsync');
        var mockResponse = {
          statusCode: 403,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        mockBody = {error:true};
        requestStub.returns(new Promise.reject(mockBody));
      });

      afterEach(function() {
        requestStub.restore();
      });

      it('request should error as false, using promises',function(){
        return stubbedRequestor.get(sampleRequest)
          .catch(function(error) {
            error.error.should.equal(true);
          });
      });

      it('request should error as false, using callbacks',function(){
        stubbedRequestor.get(sampleRequest, function(err, data) {
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
        requestor.get(sampleRequest);
        spyGet.args[0][0].headers.Authorization.should.equal(sampleHeaders.Authorization);
        spyGet.args[0][0].headers.Accept.should.equal(sampleHeaders.Accept);
        spyGet.args[0][0].headers['Content-Type'].should.equal(sampleHeaders['Content-Type']);
        spyGet.args[0][0].headers['User-Agent'].should.equal(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given',function() {
        requestor.get(sampleRequest);
        spyGet.args[0][0].url.should.equal('https://api.smartsheet.com/URL');
      });

      it('queryString sent to request should match given',function() {
        requestor.get(sampleRequestWithQueryParameters);
        spyGet.args[0][0].qs.should.equal(sampleRequestWithQueryParameters.queryParameters);
      });
    });

    describe('#Retry', function() {
      var requestStub = null;
      var handleResponseStub = sinon.stub();
      var stubbedRequestor = require('../lib/utils/httpRequestor')
        .create({request: request, handleResponse: handleResponseStub});
      var sampleRequestForRetry = null;

      function givenGetReturnsError() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(new Promise.reject({errorCode: 4001}));
      }

      function givenGetReturnsSuccess() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(true);
      }

      beforeEach(function() {
        requestStub = sinon.stub(request, 'getAsync');
        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryTime = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(function() {
        requestStub.restore();
      });

      it('get called once on success', function() {
        givenGetReturnsSuccess();
        return stubbedRequestor.get(sampleRequestForRetry)
          .then(function (data) {
            requestStub.callCount.should.be.equal(1);
          });
      });

      it('get retried on error', function() {
        givenGetReturnsError();
        return stubbedRequestor.get(sampleRequestForRetry)
          .catch(function(err) {
            requestStub.callCount.should.be.above(1);
          });
      });

      it('get does not exceed max time', function() {
        givenGetReturnsError();
        var startTime = Date.now();
        return stubbedRequestor.get(sampleRequestForRetry)
        .catch(function(err) {
          sampleRequestForRetry.maxRetryTime.should.be.above(Date.now() - startTime - 5);
        });
      });
    });
  });

  describe('#POST', function() {
    describe('#Successful request', function() {
      var requestStub = null;

      var stubbedRequestor = require('../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => true});

      beforeEach(function() {
        requestStub = sinon.stub(request, 'postAsync');
        var mockResponse = {
          statusCode: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        var mockBody = '{"hello":"world"}';
        requestStub.returns(new Promise.resolve([mockResponse, mockBody]));
      });

      afterEach(function() {
        requestStub.restore();
      });

      it('request should resolve as true',function() {
        return stubbedRequestor.post(sampleRequest)
          .then(function(data) {
            data.should.be.true;
          });
      });

      it('request should call callback as true',function() {
        stubbedRequestor.post(sampleRequest, function(err, data) {
          data.should.be.true;
        });
      });
    });

    describe('#Error on request', function() {
      var requestStub = null;     
      var mockBody = {error:true};

      var stubbedRequestor = require('../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => true});

      beforeEach(function() {
        requestStub = sinon.stub(request, 'postAsync');
        requestStub.returns(new Promise.reject(mockBody));
      });

      afterEach(function() {
        requestStub.restore();
      });

      it('request should error as false',function(){
        return stubbedRequestor.post(sampleRequest)
          .catch(function(error) {
            error.error.should.equal(true);
          });
      });

      it('request should error as false',function(){
        stubbedRequestor.post(sampleRequest, function(err, data) {
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
        requestor.post(sampleRequest);
        spyPost.args[0][0].headers.Authorization.should.equal(sampleHeaders.Authorization);
        spyPost.args[0][0].headers.Accept.should.equal(sampleHeaders.Accept);
        spyPost.args[0][0].headers['Content-Type'].should.equal(sampleHeaders['Content-Type']);
        spyPost.args[0][0].headers['User-Agent'].should.equal(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given',function() {
        requestor.post(sampleRequest);
        spyPost.args[0][0].url.should.equal('https://api.smartsheet.com/URL');
      });

      it('queryString sent to request should match given',function() {
        requestor.post(sampleRequestWithQueryParameters);
        spyPost.args[0][0].qs.should.equal(sampleRequestWithQueryParameters.queryParameters);
      });

      it('body sent to request should match given',function() {
        requestor.post(sampleRequestWithQueryParameters);
        spyPost.args[0][0].body.should.equal(JSON.stringify(sampleRequestWithQueryParameters.body));
      });
    });

    describe('#Retry', function() {
      var requestStub = null;
      var handleResponseStub = sinon.stub();
      
      var stubbedRequestor = require('../lib/utils/httpRequestor')
        .create({request: request, handleResponse: handleResponseStub});

      var sampleRequestForRetry;

      function givenPostReturnsError() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(new Promise.reject({errorCode: 4001}));
      }

      function givenPostReturnsSuccess() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(true);
      }

      beforeEach(function() {
        requestStub = sinon.stub(request, 'postAsync');

        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryTime = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(function() {
        requestStub.restore();
      });

      it('post called once on success', function() {
        givenPostReturnsSuccess();
        return stubbedRequestor.post(sampleRequestForRetry)
        .then(function (data) {
          requestStub.callCount.should.be.equal(1);
        });
      });

      it('post retried on error', function() {
        givenPostReturnsError();
        return stubbedRequestor.post(sampleRequestForRetry)
        .catch(function(err) {
          requestStub.callCount.should.be.above(1);
        });
      });

      it('post does not exceed max time', function() {
        givenPostReturnsError();
        var startTime = Date.now();
        return stubbedRequestor.post(sampleRequestForRetry)
        .catch(function(err) {
          sampleRequestForRetry.maxRetryTime.should.be.above(Date.now() - startTime - 5);
        });
      });
    });
  });

  describe('#PUT', function() {
    describe('#Successful request', function() {
      var requestStub = null;
      
      var stubbedRequestor = require('../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => true});

      beforeEach(function() {
        requestStub = sinon.stub(request, 'putAsync');
        var mockResponse = {
          statusCode: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        var mockBody = '{"hello":"world"}';
        requestStub.returns(new Promise.resolve([mockResponse, mockBody]));
      });

      afterEach(function() {
        requestStub.restore();
      });

      it('request should resolve as true',function() {
        return stubbedRequestor.put(sampleRequest)
          .then(function(data) {
            data.should.be.true;
          });
      });

      it('request should call callback as true',function() {
        stubbedRequestor.put(sampleRequest, function(err, data) {
          data.should.be.true;
        });
      });
    });

    describe('#Error on request', function() {
      var stub = null;
      var mockBody = {error: true};
      
      var stubbedRequestor = require('../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => true});

      beforeEach(function() {
        stub = sinon.stub(request, 'putAsync');
        var mockResponse = {
          statusCode: 403,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        stub.returns(new Promise.reject(mockBody));
      });

      afterEach(function() {
        stub.restore();
      });

      it('request should error as false',function(){
        return stubbedRequestor.put(sampleRequest)
          .catch(function(error) {
            error.error.should.be.true;
          });
      });

      it('request should error as false',function(){
        stubbedRequestor.put(sampleRequest, function(err, data) {
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
        requestor.put(sampleRequest);
        spyPut.args[0][0].headers.Authorization.should.equal(sampleHeaders.Authorization);
        spyPut.args[0][0].headers.Accept.should.equal(sampleHeaders.Accept);
        spyPut.args[0][0].headers['Content-Type'].should.equal(sampleHeaders['Content-Type']);
        spyPut.args[0][0].headers['User-Agent'].should.equal(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given',function() {
        requestor.put(sampleRequest);
        spyPut.args[0][0].url.should.equal('https://api.smartsheet.com/URL');
      });

      it('queryString sent to request should match given',function() {
        requestor.put(sampleRequestWithQueryParameters);
        spyPut.args[0][0].qs.should.equal(sampleRequestWithQueryParameters.queryParameters);
      });

      it('body sent to request should match given',function() {
        requestor.put(sampleRequestWithQueryParameters);
        spyPut.args[0][0].body.should.equal(JSON.stringify(sampleRequestWithQueryParameters.body));
      });
    });

    describe('#Retry', function() {
      var requestStub = null;
      var handleResponseStub = sinon.stub();
      
      var stubbedRequestor = require('../lib/utils/httpRequestor')
        .create({request: request, handleResponse: handleResponseStub});

      var sampleRequestForRetry = null;

      function givenPutReturnsError() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(new Promise.reject({errorCode: 4001}));
      }

      function givenPutReturnsSuccess() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(true);
      }

      beforeEach(function() {
        requestStub = sinon.stub(request, 'putAsync');

        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryTime = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(function() {
        requestStub.restore();
      });

      it('put called once on success', function() {
        givenPutReturnsSuccess();
        return stubbedRequestor.put(sampleRequestForRetry)
        .then(function(data) {
          requestStub.callCount.should.be.equal(1);
        });
        
      });

      it('put retried on error', function() {
        givenPutReturnsError();
        return stubbedRequestor.put(sampleRequestForRetry)
        .catch(function(err) {
          requestStub.callCount.should.be.above(1);
        });
      });

      it('put does not exceed max time', function() {
        givenPutReturnsError();
        var startTime = Date.now();
        return stubbedRequestor.put(sampleRequestForRetry)
        .catch(function(err) {
          sampleRequestForRetry.maxRetryTime.should.be.above(Date.now() - startTime - 5);
        });
      });
    });
  });

  describe('#DELETE', function() {
    describe('#Successful request', function() {
      var requestStub = null;
      
      var stubbedRequestor = require('../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => true});

      beforeEach(function() {
        requestStub = sinon.stub(request, 'delAsync');
        var mockResponse = {
          statusCode: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        var mockBody = '{"hello":"world"}';
        requestStub.returns(new Promise.resolve([mockResponse, mockBody]));
      });

      afterEach(function() {
        requestStub.restore();
      });

      it('request should resolve as true',function() {
        return stubbedRequestor.delete(sampleRequest)
          .then(function(data) {
            data.should.be.true;
          });
      });

      it('request should call callback as true',function() {
        stubbedRequestor.delete(sampleRequest, function(err, data) {
          data.should.be.true;
        });
      });
    });

    describe('#Error on request', function() {
      var requestStub = null;
      var handleResponseStub = null;
      var mockBody = {error: true};
      
      var stubbedRequestor = require('../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => true});

      beforeEach(function() {
        requestStub = sinon.stub(request, 'delAsync');
        var mockResponse = {
          statusCode: 403,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        requestStub.returns(new Promise.reject(mockBody));
      });

      afterEach(function() {
        requestStub.restore();
      });

      it('request should error as false',function(){
        return stubbedRequestor.delete(sampleRequest)
          .catch(function(error) {
            error.error.should.be.true;
          });
      });

      it('request should error as false',function(){
        stubbedRequestor.delete(sampleRequest, function(err, data) {
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
        requestor.delete(sampleRequest);
        spyPut.args[0][0].headers.Authorization.should.equal(sampleHeaders.Authorization);
        spyPut.args[0][0].headers.Accept.should.equal(sampleHeaders.Accept);
        spyPut.args[0][0].headers['Content-Type'].should.equal(sampleHeaders['Content-Type']);
        spyPut.args[0][0].headers['User-Agent'].should.equal(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given',function() {
        requestor.delete(sampleRequest);
        spyPut.args[0][0].url.should.equal('https://api.smartsheet.com/URL');
      });

      it('queryString sent to request should match given',function() {
        requestor.delete(sampleRequestWithQueryParameters);
        spyPut.args[0][0].qs.should.equal(sampleRequestWithQueryParameters.queryParameters);
      });
    });

    describe('#Retry', function() {
      var requestStub = null;
      var handleResponseStub = sinon.stub();
      
      var stubbedRequestor = require('../lib/utils/httpRequestor')
        .create({request: request, handleResponse: handleResponseStub});

      var sampleRequestForRetry;

      function givenDeleteReturnsError() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(new Promise.reject({errorCode: 4001}));
      }

      function givenDeleteReturnsSuccess() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(true);
      }

      beforeEach(function() {
        requestStub = sinon.stub(request, 'delAsync');

        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryTime = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(function() {
        requestStub.restore();
      });

      it('delete called once on success', function() {
        givenDeleteReturnsSuccess();
        return stubbedRequestor.delete(sampleRequestForRetry)
        .then(function(data) {
          requestStub.callCount.should.be.equal(1);
        });
      });

      it('delete retried on error', function() {
        givenDeleteReturnsError();
        return stubbedRequestor.delete(sampleRequestForRetry)
        .catch(function(err) {
          requestStub.callCount.should.be.above(1);
        });
      });

      it('delete does not exceed max time', function() {
        givenDeleteReturnsError();
        var startTime = Date.now();
        return stubbedRequestor.delete(sampleRequestForRetry)
        .catch(function(err) {
          sampleRequestForRetry.maxRetryTime.should.be.above(Date.now() - startTime - 5);
        });
      });
    });
  });
});
