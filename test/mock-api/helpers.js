var should = require('should');
var assert = require('assert');
var _ = require('underscore');
var smartsheet = require('../..');

exports.setupMockApiTest = function() {
    process.env.SMARTSHEET_API_HOST = "http://localhost:8082/";
};

exports.setupClient = function() {
    return smartsheet.createClient({accessToken:'1234'});
};

exports.defineMockApiTests = function(scenarios) {
    _.each(scenarios, function (scenario) {
        defineMockApiTest(scenario)
    });
};

var defineMockApiTest = function(scenario) {
    describe('#' + scenario.name, function () {
        it('makes request', function () {
            scenario.options.apiScenario = scenario.name;
            return scenario.method(scenario.options)
            .then(function(response) {
                if (scenario.shouldError) {
                    assert.fail('Expected error response, received success.');
                }
                else {
                    should.exist(response);
                }
            })
            .catch(function(error) {
                if (scenario.shouldError && !isScenarioError(error)) {
                    return Promise.resolve();
                }
                else {
                    return Promise.reject(new Error(error.message));
                }
            });
        });
    });
};

function isScenarioError(error) {
    return error.errorCode === 9999;
}