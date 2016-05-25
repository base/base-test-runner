'use strict';

var opts = {alias: {pattern: 'p'}};
var argv = require('yargs-parser')(process.argv.slice(2), opts);
var suite = require('base-test-suite');
var runner = require('base-test-runner')(argv);

/**
 * Run the tests in `base-test-suite`
 */

runner.on('file', function(file) {
  require(file.path)(require('templates'));
});

runner.addFiles(suite.test.templates);
