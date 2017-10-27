var _ = require('underscore');
var fs = require('fs');

if (process.argv.length < 4) {
    console.log("Usage: node gen_test_from_scenario.js path/to/scenario/file path/to/output/file");
    process.exit(1);
}

var scenarioFile = process.argv[2];
var outputFile = process.argv[3];

// load scenarios
scenarios = require(scenarioFile);

// create tests
tests = [];
_.each(scenarios, function (scenario) {
    test = {};
    test.name = scenario['scenario'];
    test.method = 'TODO_METHOD';
    test.shouldError = (scenario['response']['status'] !== undefined && scenario['response']['status'] != 200);

    test.options = {}
    if (scenario['request']['body'] !== undefined) {
        test.options['body'] = scenario['request']['body'];
    }

    if (scenario['request']['queryParameters'] !== undefined) {
        test.options['queryParameters'] = scenario['request']['queryParameters'];
    }
    
    tests.push(test);
});

// save to file
fs.writeFileSync(outputFile, JSON.stringify(tests, null, 2))