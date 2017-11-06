// Summary:
// This script can be used to generate mock api tests from a scenario.json
// file. The output will be a JSON array that can be copied into a test file and
// run. You will need to replace the 'TODO_METHOD' string for each
// test with an actual method (such as client.sheets.listSheets) before
// running the tests.

var _ = require('underscore');
var fs = require('fs');

if (process.argv.length < 4) {
    console.log("Usage: node gen_test_from_scenarios.js path/to/scenario/file path/to/output/file");
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