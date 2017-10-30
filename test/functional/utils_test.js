var should = require('should');
var request = require('request');
var sinon = require('sinon');
var Promise = require('bluebird');
var _ = require('underscore');

var requestor = require('../../lib/utils/httpRequestor').create({request: request});

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

var EXPECTED_VERSION = '1.0.1';

describe('Utils Unit Tests', function() {
  describe('#HttpRequestor', function() {
    it('should have GET method', () => requestor.should.have.property('get'));

    it('should have POST method', () => requestor.should.have.property('post'));

    it('should have POST file method', () => requestor.should.have.property('postFile'));

    it('should have PUT method', () => requestor.should.have.property('put'));

    it('should have DELETE method', () => requestor.should.have.property('delete'));

    describe('#buildUrl', function() {
      var host = null;

      beforeEach(() => {
        host = process.env.SMARTSHEET_API_HOST = 'host/';
      });

      afterEach(() => {
        process.env.SMARTSHEET_API_HOST = '';
        host = null;
      });

      it('should return the set HOST with URL appended', () => {
        var url = 'test';
        var builtUrl = requestor.internal.buildUrl({url:url});
        builtUrl.should.equal(host + url);
      });

      it('url should equal https://api.smartsheet.com/2.0/', () => {
        process.env.SMARTSHEET_API_HOST = '';
        var builtUrl = requestor.internal.buildUrl({});
        builtUrl.should.equal('https://api.smartsheet.com/2.0/');
      });

      it('url should contain the host + url', () => {
        var builtUrl = requestor.internal.buildUrl({url: 'url/'});
        builtUrl.should.equal(host + 'url/');
      });

      it('url should contain the ID', () => {
        var builtUrl = requestor.internal.buildUrl({url: 'url/', id: '123'});
        builtUrl.should.equal(host + 'url/123');
      });
    });

    describe('#buildHeaders', function() {
      var newType = 'text/xml';
      var applicationJson = 'application/json';

      it('authorization header should have token', () => {
        var headers = requestor.internal.buildHeaders({accessToken: 'token'});
        headers.Authorization.should.equal('Bearer token');
      });

      it('accept header should equal ' + applicationJson, () => {
        var headers = requestor.internal.buildHeaders({});
        headers.Accept.should.equal(applicationJson);
      });

      it('accept header should equal ' + newType, () => {
        var headers = requestor.internal.buildHeaders({accept: newType});
        headers.Accept.should.equal(newType);
      });

      it('content-type header should ' + applicationJson, () => {
        var headers = requestor.internal.buildHeaders({contentType: applicationJson});
        headers['Content-Type'].should.equal(applicationJson);
      });

      it('content-type header should equal ' + newType, () => {
        var headers = requestor.internal.buildHeaders({contentType: newType});
        headers['Content-Type'].should.equal(newType);
      });

      it('Content-Disposition should equal filename', () => {
        var headers = requestor.internal.buildHeaders({fileName: 'test'});
        headers['Content-Disposition'].should.equal('attachment; filename="test"');
      });

      it('Content-Length should equal 123', () => {
        var headers = requestor.internal.buildHeaders({fileName: 'test',   fileSize: 123});
        headers['Content-Length'].should.equal(123);
      });

      it('Assume-User should equal URI encoded email', () => {
        var headers = requestor.internal.buildHeaders({assumeUser: 'john.doe@smartsheet.com'});
        headers['Assume-User'].should.equal('john.doe%40smartsheet.com');
      });
    });
  });

  describe('#GET', function() {
    describe('#Successful request', function() {
      var requestStub = null;
      var stubbedRequestor = require('../../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => ({content: true})});

      beforeEach(() => {
        requestStub = sinon.stub(request, 'getAsync');
        var mockResponse = {
          statusCode: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        var mockBody = '{"hello":"world"}';
        requestStub.returns(Promise.resolve([mockResponse, mockBody]));
      });

      afterEach(() => {
        requestStub.restore();
      });

      it('request should resolve promise as true', () =>
        stubbedRequestor.get(sampleRequest)
          .should.eventually.be.true);

      it('request should call callback as true', () =>
        stubbedRequestor.get(sampleRequest, function(err, data) {
          data.should.be.true;
        }));
    });

    describe('#Error on request', function() {
      var requestStub = null;
      var stubbedRequestor = require('../../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => ({content: true})});
      var mockBody;

      beforeEach(() => {
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

      afterEach(() => {
        requestStub.restore();
      });

      it('request should error as false, using promises', () =>
        stubbedRequestor
          .get(sampleRequest)
          .catch(error => error.error.should.be.true));

      it('request should error as false, using callbacks', () => {
        stubbedRequestor
          .get(sampleRequest,
               (err, data) => err.should.be.eql(mockBody));
      });
    });

    describe('#Arguments', function() {
      var spyGet;

      beforeEach(() => {
        spyGet = sinon.spy(request, 'getAsync');
      });

      afterEach(() => {
        spyGet.restore();
      });

      it('headers sent as part of request should match given', () => {
        var sampleHeaders = {
          Authorization: 'Bearer TOKEN',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': `smartsheet-javascript-sdk/${EXPECTED_VERSION}`
        };
        requestor.get(sampleRequest);
        spyGet.args[0][0].headers.Authorization.should.equal(sampleHeaders.Authorization);
        spyGet.args[0][0].headers.Accept.should.equal(sampleHeaders.Accept);
        spyGet.args[0][0].headers['Content-Type'].should.equal(sampleHeaders['Content-Type']);
        spyGet.args[0][0].headers['User-Agent'].should.equal(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given', () => {
        requestor.get(sampleRequest);
        spyGet.args[0][0].url.should.equal('https://api.smartsheet.com/2.0/URL');
      });

      it('queryString sent to request should match given', () => {
        requestor.get(sampleRequestWithQueryParameters);
        spyGet.args[0][0].qs.should.equal(sampleRequestWithQueryParameters.queryParameters);
      });
    });

    describe('#Retry', function() {
      var requestStub = null;
      var handleResponseStub = sinon.stub();
      var stubbedRequestor = require('../../lib/utils/httpRequestor')
        .create({request: request, handleResponse: handleResponseStub});
      var sampleRequestForRetry = null;

      function givenGetReturnsError() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(new Promise.reject({errorCode: 4001}));
      }

      function givenGetReturnsSuccess() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns({content: true});
      }

      function givenEarlyExitBackoff() {
        sampleRequestForRetry.calcRetryBackoff = numRetry => numRetry == 1 ? -1 : 1;
      }

      function givenBackoffDependsOnError() {
        sampleRequestForRetry.calcRetryBackoff = (numRetry, error) => {
          if(error.errorCode == 4001) return numRetry == 1 ? -1 : 1;
          else throw new Error('Error object not provided to backoff');
        };
      }

      beforeEach(() => {
        requestStub = sinon.stub(request, 'getAsync');
        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryDurationMillis = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(() => {
        requestStub.restore();
      });

      it('get called once on success', () => {
        givenGetReturnsSuccess();
        return stubbedRequestor
          .get(sampleRequestForRetry)
          .then(data => requestStub.callCount.should.equal(1));
      });

      it('get retried on error', () => {
        givenGetReturnsError();
        return stubbedRequestor
          .get(sampleRequestForRetry)
          .catch(err => requestStub.callCount.should.be.above(1));
      });

      it('get does not exceed max time', () => {
        givenGetReturnsError();
        var startTime = Date.now();
        return stubbedRequestor
          .get(sampleRequestForRetry)
          .catch(err =>
            sampleRequestForRetry.maxRetryDurationMillis.should.be.above(Date.now() - startTime - 5));
      });

      it('get stops retrying when receiving a negative backoff', () => {
        givenGetReturnsError();
        givenEarlyExitBackoff();
        return stubbedRequestor
          .get(sampleRequestForRetry)
          .catch(err => requestStub.callCount.should.equal(2));
      });

      it('get passes the causing error to the backoff function', () => {
        givenGetReturnsError();
        givenBackoffDependsOnError();
        return stubbedRequestor
          .get(sampleRequestForRetry)
          .catch(err => requestStub.callCount.should.equal(2));
      });
    });
  });

  describe('#POST', function() {
    describe('#Successful request', function() {
      var requestStub = null;

      var stubbedRequestor = require('../../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => ({content: true})});

      beforeEach(() => {
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

      afterEach(() => {
        requestStub.restore();
      });

      it('request should resolve as true', () =>
        stubbedRequestor
          .post(sampleRequest)
          .then(data => data.should.be.true));

      it('request should call callback as true', () => {
        stubbedRequestor.post(sampleRequest, function(err, data) {
          data.should.be.true;
        });
      });
    });

    describe('#Error on request', function() {
      var requestStub = null;     
      var mockBody = {error:true};

      var stubbedRequestor = require('../../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => ({content: true})});

      beforeEach(() => {
        requestStub = sinon.stub(request, 'postAsync');
        requestStub.returns(new Promise.reject(mockBody));
      });

      afterEach(() => {
        requestStub.restore();
      });

      it('request should error as false', () =>
        stubbedRequestor
          .post(sampleRequest)
          .catch(error => error.error.should.be.true));

      it('request should error as false', () => {
        stubbedRequestor
          .post(sampleRequest,
                (err, data) => err.should.be.eql(mockBody));
      });
    });

    describe('#Arguments', function() {
      var spyPost;

      beforeEach(() => {
        spyPost = sinon.spy(request, 'postAsync');
      });

      afterEach(() => {
        spyPost.restore();
      });

      it('headers sent as part of request should match given', () => {
        var sampleHeaders = {
          Authorization: 'Bearer TOKEN',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': `smartsheet-javascript-sdk/${EXPECTED_VERSION}`
        };
        requestor.post(sampleRequest);
        spyPost.args[0][0].headers.Authorization.should.equal(sampleHeaders.Authorization);
        spyPost.args[0][0].headers.Accept.should.equal(sampleHeaders.Accept);
        spyPost.args[0][0].headers['Content-Type'].should.equal(sampleHeaders['Content-Type']);
        spyPost.args[0][0].headers['User-Agent'].should.equal(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given', () => {
        requestor.post(sampleRequest);
        spyPost.args[0][0].url.should.equal('https://api.smartsheet.com/2.0/URL');
      });

      it('queryString sent to request should match given', () => {
        requestor.post(sampleRequestWithQueryParameters);
        spyPost.args[0][0].qs.should.equal(sampleRequestWithQueryParameters.queryParameters);
      });

      it('body sent to request should match given', () => {
        requestor.post(sampleRequestWithQueryParameters);
        spyPost.args[0][0].body.should.equal(JSON.stringify(sampleRequestWithQueryParameters.body));
      });
    });

    describe('#Retry', function() {
      var requestStub = null;
      var handleResponseStub = sinon.stub();
      
      var stubbedRequestor = require('../../lib/utils/httpRequestor')
        .create({request: request, handleResponse: handleResponseStub});

      var sampleRequestForRetry;

      function givenPostReturnsError() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(new Promise.reject({errorCode: 4001}));
      }

      function givenPostReturnsSuccess() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns({content: true});
      }
      
      function givenEarlyExitBackoff() {
        sampleRequestForRetry.calcRetryBackoff = numRetry => numRetry == 1 ? -1 : 1;
      }
      
      function givenBackoffDependsOnError() {
        sampleRequestForRetry.calcRetryBackoff = (numRetry, error) => {
          if(error.errorCode == 4001) return numRetry == 1 ? -1 : 1;
          else throw new Error('Error object not provided to backoff');
        };
      }

      beforeEach(() => {
        requestStub = sinon.stub(request, 'postAsync');

        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryDurationMillis = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(() => {
        requestStub.restore();
      });

      it('post called once on success', () => {
        givenPostReturnsSuccess();
        return stubbedRequestor
          .post(sampleRequestForRetry)
          .then(data => requestStub.callCount.should.equal(1));
      });

      it('post retried on error', () => {
        givenPostReturnsError();
        return stubbedRequestor
          .post(sampleRequestForRetry)
          .catch(err => requestStub.callCount.should.be.above(1));
      });

      it('post does not exceed max time', () => {
        givenPostReturnsError();
        var startTime = Date.now();
        return stubbedRequestor
          .post(sampleRequestForRetry)
          .catch(err => sampleRequestForRetry.maxRetryDurationMillis
                   .should.be.above(Date.now() - startTime - 5));
      });

      it('post stops retrying when receiving a negative backoff', () => {
        givenPostReturnsError();
        givenEarlyExitBackoff();
        return stubbedRequestor
          .post(sampleRequestForRetry)
          .catch(err => requestStub.callCount.should.equal(2));
      });

      it('post passes the causing error to the backoff function', () => {
        givenPostReturnsError();
        givenBackoffDependsOnError();
        return stubbedRequestor
          .post(sampleRequestForRetry)
          .catch(err => requestStub.callCount.should.equal(2));
      });
    });
  });

  describe('#PUT', function() {
    describe('#Successful request', function() {
      var requestStub = null;
      
      var stubbedRequestor = require('../../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => ({content: true})});

      beforeEach(() => {
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

      afterEach(() => {
        requestStub.restore();
      });

      it('request should resolve as true', () =>
        stubbedRequestor
          .put(sampleRequest)
          .then(data => data.should.be.true));

      it('request should call callback as true', () => {
        stubbedRequestor
          .put(sampleRequest,
               (err, data) => data.should.be.true);
      });
    });

    describe('#Error on request', function() {
      var stub = null;
      var mockBody = {error: true};
      
      var stubbedRequestor = require('../../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => ({content: true})});

      beforeEach(() => {
        stub = sinon.stub(request, 'putAsync');
        var mockResponse = {
          statusCode: 403,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        stub.returns(new Promise.reject(mockBody));
      });

      afterEach(() => {
        stub.restore();
      });

      it('request should error as false', () =>
        stubbedRequestor
          .put(sampleRequest)
          .catch(error => error.error.should.be.true));

      it('request should error as false', () => {
        stubbedRequestor
          .put(sampleRequest,
               (err, data) => err.should.eql(mockBody));
      });
    });

    describe('#Arguments', function() {
      var spyPut;

      beforeEach(() => {
        spyPut = sinon.spy(request, 'putAsync');
      });

      afterEach(() => {
        spyPut.restore();
      });

      it('headers sent as part of request should match given', () => {
        var sampleHeaders = {
          Authorization: 'Bearer TOKEN',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': `smartsheet-javascript-sdk/${EXPECTED_VERSION}`
        };
        requestor.put(sampleRequest);
        spyPut.args[0][0].headers.Authorization.should.equal(sampleHeaders.Authorization);
        spyPut.args[0][0].headers.Accept.should.equal(sampleHeaders.Accept);
        spyPut.args[0][0].headers['Content-Type'].should.equal(sampleHeaders['Content-Type']);
        spyPut.args[0][0].headers['User-Agent'].should.equal(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given', () => {
        requestor.put(sampleRequest);
        spyPut.args[0][0].url.should.equal('https://api.smartsheet.com/2.0/URL');
      });

      it('queryString sent to request should match given', () => {
        requestor.put(sampleRequestWithQueryParameters);
        spyPut.args[0][0].qs.should.equal(sampleRequestWithQueryParameters.queryParameters);
      });

      it('body sent to request should match given', () => {
        requestor.put(sampleRequestWithQueryParameters);
        spyPut.args[0][0].body.should.equal(JSON.stringify(sampleRequestWithQueryParameters.body));
      });
    });

    describe('#Retry', function() {
      var requestStub = null;
      var handleResponseStub = sinon.stub();
      
      var stubbedRequestor = require('../../lib/utils/httpRequestor')
        .create({request: request, handleResponse: handleResponseStub});

      var sampleRequestForRetry = null;

      function givenPutReturnsError() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(new Promise.reject({errorCode: 4001}));
      }

      function givenPutReturnsSuccess() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns({content: true});
      }
      
      function givenEarlyExitBackoff() {
        sampleRequestForRetry.calcRetryBackoff = numRetry => numRetry == 1 ? -1 : 1;
      }
      
      function givenBackoffDependsOnError() {
        sampleRequestForRetry.calcRetryBackoff = (numRetry, error) => {
          if(error.errorCode == 4001) return numRetry == 1 ? -1 : 1;
          else throw new Error('Error object not provided to backoff');
        };
      }

      beforeEach(() => {
        requestStub = sinon.stub(request, 'putAsync');

        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryDurationMillis = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(() => {
        requestStub.restore();
      });

      it('put called once on success', () => {
        givenPutReturnsSuccess();
        return stubbedRequestor
          .put(sampleRequestForRetry)
          .then(data => requestStub.callCount.should.equal(1));
      });

      it('put retried on error', () => {
        givenPutReturnsError();
        return stubbedRequestor
          .put(sampleRequestForRetry)
          .catch(err => requestStub.callCount.should.be.above(1));
      });

      it('put does not exceed max time', () => {
        givenPutReturnsError();
        var startTime = Date.now();
        return stubbedRequestor
          .put(sampleRequestForRetry)
          .catch(err => sampleRequestForRetry.maxRetryDurationMillis
                   .should.be.above(Date.now() - startTime - 5));
      });

      it('put stops retrying when receiving a negative backoff', () => {
        givenPutReturnsError();
        givenEarlyExitBackoff();
        return stubbedRequestor
          .put(sampleRequestForRetry)
          .catch(err => requestStub.callCount.should.equal(2));
      });

      it('put passes the causing error to the backoff function', () => {
        givenPutReturnsError();
        givenBackoffDependsOnError();
        return stubbedRequestor
          .put(sampleRequestForRetry)
          .catch(err => requestStub.callCount.should.equal(2));
      });
    });
  });

  describe('#DELETE', function() {
    describe('#Successful request', function() {
      var requestStub = null;
      
      var stubbedRequestor = require('../../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => ({content: true})});

      beforeEach(() => {
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

      afterEach(() => {
        requestStub.restore();
      });

      it('request should resolve as true', () =>
        stubbedRequestor
          .delete(sampleRequest)
          .then(data => data.should.be.true));

      it('request should call callback as true', () => {
        stubbedRequestor
          .delete(sampleRequest,
                  (err, data) => data.should.be.true);
      });
    });

    describe('#Error on request', function() {
      var requestStub = null;
      var handleResponseStub = null;
      var mockBody = {error: true};
      
      var stubbedRequestor = require('../../lib/utils/httpRequestor')
        .create({request: request, handleResponse: () => ({content: true})});

      beforeEach(() => {
        requestStub = sinon.stub(request, 'delAsync');
        var mockResponse = {
          statusCode: 403,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        requestStub.returns(new Promise.reject(mockBody));
      });

      afterEach(() => {
        requestStub.restore();
      });

      it('request should error as false', () =>
        stubbedRequestor
          .delete(sampleRequest)
          .catch(error => error.error.should.be.true));

      it('request should error as false', () => {
        stubbedRequestor
          .delete(sampleRequest,
                  (err, data) => err.should.eql(mockBody));
      });
    });

    describe('#Arguments', function() {
      var spyPut;

      beforeEach(() => {
        spyPut = sinon.spy(request, 'delAsync');
      });

      afterEach(() => {
        spyPut.restore();
      });

      it('headers sent as part of request should match given', () => {
        var sampleHeaders = {
          Authorization: 'Bearer TOKEN',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': `smartsheet-javascript-sdk/${EXPECTED_VERSION}`
        };
        requestor.delete(sampleRequest);
        spyPut.args[0][0].headers.Authorization.should.equal(sampleHeaders.Authorization);
        spyPut.args[0][0].headers.Accept.should.equal(sampleHeaders.Accept);
        spyPut.args[0][0].headers['Content-Type'].should.equal(sampleHeaders['Content-Type']);
        spyPut.args[0][0].headers['User-Agent'].should.equal(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given', () => {
        requestor.delete(sampleRequest);
        spyPut.args[0][0].url.should.equal('https://api.smartsheet.com/2.0/URL');
      });

      it('queryString sent to request should match given', () => {
        requestor.delete(sampleRequestWithQueryParameters);
        spyPut.args[0][0].qs.should.equal(sampleRequestWithQueryParameters.queryParameters);
      });
    });

    describe('#Retry', function() {
      var requestStub = null;
      var handleResponseStub = sinon.stub();
      
      var stubbedRequestor = require('../../lib/utils/httpRequestor')
        .create({request: request, handleResponse: handleResponseStub});

      var sampleRequestForRetry;

      function givenDeleteReturnsError() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns(new Promise.reject({errorCode: 4001}));
      }

      function givenDeleteReturnsSuccess() {
        requestStub.returns(new Promise.resolve([{}, {}]));
        handleResponseStub.returns({content: true});
      }
      
      function givenEarlyExitBackoff() {
        sampleRequestForRetry.calcRetryBackoff = numRetry => numRetry == 1 ? -1 : 1;
      }
      
      function givenBackoffDependsOnError() {
        sampleRequestForRetry.calcRetryBackoff = (numRetry, error) => {
          if(error.errorCode == 4001) return numRetry == 1 ? -1 : 1;
          else throw new Error('Error object not provided to backoff');
        };
      }

      beforeEach(() => {
        requestStub = sinon.stub(request, 'delAsync');

        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryDurationMillis = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(() => {
        requestStub.restore();
      });

      it('delete called once on success', () => {
        givenDeleteReturnsSuccess();
        return stubbedRequestor
          .delete(sampleRequestForRetry)
          .then(data => requestStub.callCount.should.equal(1));
      });

      it('delete retried on error', () => {
        givenDeleteReturnsError();
        return stubbedRequestor
          .delete(sampleRequestForRetry)
          .catch(err => requestStub.callCount.should.be.above(1));
      });

      it('delete does not exceed max time', () => {
        givenDeleteReturnsError();
        var startTime = Date.now();
        return stubbedRequestor
          .delete(sampleRequestForRetry)
          .catch(err => sampleRequestForRetry.maxRetryDurationMillis
                   .should.be.above(Date.now() - startTime - 5));
      });

      it('delete stops retrying when receiving a negative backoff', () => {
        givenDeleteReturnsError();
        givenEarlyExitBackoff();
        return stubbedRequestor
          .delete(sampleRequestForRetry)
          .catch(err => requestStub.callCount.should.equal(2));
      });

      it('delete passes the causing error to the backoff function', () => {
        givenDeleteReturnsError();
        givenBackoffDependsOnError();
        return stubbedRequestor
          .delete(sampleRequestForRetry)
          .catch(err => requestStub.callCount.should.equal(2));
      });
    });
  });
});
