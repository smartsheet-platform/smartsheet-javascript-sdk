// Summary:
// This script can be used to generate mock api tests from a scenario.json
// file. The output will be a JSON array that can be copied into a test file and
// run. You will need to replace the 'TODO_METHOD' string for each
// test with an actual method (such as client.sheets.listSheets) and set path ids before
// running the tests.

var _ = require('underscore');
var fs = require('fs');

var argv = require('yargs')
    .alias('s', 'scenarios')
    .describe('s', 'Path to the JSON file containing new scenarios')
    .alias('o', 'output')
    .describe('o', 'File to output the new tests to')
    .demandOption(['scenarios', 'output'])
    .argv;


// load scenarios
scenarios = JSON.parse(fs.readFileSync(argv.scenarios));

// create tests
tests = [];
_.each(scenarios, function (scenario) {
    test = {};
    test.name = scenario['scenario'];
    test.method = 'TODO_METHOD';
    test.shouldError = (scenario['response']['status'] !== undefined && scenario['response']['status'] != 200);

    test.options = {};
    if (scenario['request']['body'] !== undefined) {
        test.options['body'] = scenario['request']['body'];
    }

    if (scenario['request']['queryParameters'] !== undefined) {
        test.options['queryParameters'] = scenario['request']['queryParameters'];
    }
    
    tests.push(test);
});

// save to file
fs.writeFileSync(argv.output, JSON.stringify(tests, null, 2));