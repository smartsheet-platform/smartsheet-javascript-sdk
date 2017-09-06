var should = require('should');
var Promise = require('bluebird');
var _ = require('underscore');
var responseHandler = require('../lib/utils/responseHandler');

describe('Utils Unit Tests', function() {
  describe('#responseHandler', function() {
    describe('#handleResponse', function() {
      var handleResponse = responseHandler.handleResponse;

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
        handleResponse(mockResponse, mockBodyError)
          .catch(function(error) {
            error.statusCode.should.equal(500);
            error.message.should.equal('EMERGENCY');
            error.errorCode.should.equal(911);
          });
      });

      it('should return parsed JSON body', function() {
        var parsed = JSON.parse(mockBody);
        var result = handleResponse(mockResponse, mockBody);
        result.hello.should.equal(parsed.hello);
      });

      it('should return the body if content type is not application/json',function(){
        mockResponse.headers['content-type'] = 'application/xml';
        var result = handleResponse(mockResponse, mockBody);
        result.should.equal(mockBody);
      });
    });
  });
});
