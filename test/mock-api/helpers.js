var should = require('should');
var assert = require('assert');
var _ = require('underscore');

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
                    if (scenario.shouldError) {
                        return Promise.resolve();
                    }
                    else {
                        var errorMessage = getErrorMessage(error);
                        return Promise.reject(new Error(errorMessage));
                    }
                });
        });
    });
};

function getErrorMessage(error) {
    var messageObj = JSON.parse(error.message);

    return messageObj.message;
}
