var should = require('should');
var Promise = require('bluebird');
var _ = require('underscore');

var handleResponse = require('../../lib/utils/responseHandler');

describe('Utils Unit Tests', function() {
  describe('#responseHandler', function() {
    describe('#handleResponse', function() {
      var mockResponse = null;
      var mockBody = null;

      beforeEach(() => {
        mockResponse = {
          statusCode: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };

        mockBody = '{"hello":"world"}';
        mockBodyError = '{"errorCode": 911, "message":"EMERGENCY"}';
      });

      afterEach(() => {
        mockResponse = null;
        mockBody = null;
      });

      it('should return a rejected promise if status code is not 200', () => {
        mockResponse.statusCode = 500;
        handleResponse(mockResponse, mockBodyError)
          .catch(function(error) {
            error.statusCode.should.equal(500);
            error.message.should.equal('EMERGENCY');
            error.errorCode.should.equal(911);
          });
      });

      it('should return parsed JSON body', () => {
        var parsed = JSON.parse(mockBody);
        var result = handleResponse(mockResponse, mockBody);
        result.content.hello.should.equal(parsed.hello);
      });

      it('should return the body if content type is not application/json', () => {
        mockResponse.headers['content-type'] = 'application/xml';
        var result = handleResponse(mockResponse, mockBody);
        result.content.should.equal(mockBody);
      });
    });
  });
});
