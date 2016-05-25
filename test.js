'use strict';

var opts = {alias: {pattern: 'p'}};
var argv = require('yargs-parser')(process.argv.slice(2), opts);
var runner = require('./')(argv);
var suite = require('base-test-suite');

/**
 * Run the tests in `base-test-suite`
 */

runner.on('templates', function(file) {
  require(file.path)(require('templates'));
});

runner.addFiles('templates', suite.test.templates);
